import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Tree() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth || 500;
        const height = container.clientHeight || 700;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.set(2.5, 2, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.x = 0;
        controls.target.y = 1;
        controls.target.z = 0;

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
        hemiLight.position.set(0, 1, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight.position.set(3, 5, 2);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const clock = new THREE.Clock();
        let mixer: THREE.AnimationMixer | null = null;
        let fallbackAutoRotateTarget: THREE.Object3D | null = null;

        const loader = new GLTFLoader();
        // 在 Vite 中，public 下资源可通过以 / 开头的绝对路径访问
        loader.load(
            '/model/tree/scene.gltf',
            (gltf) => {
                const model = gltf.scene;
                model.traverse((obj) => {
                    if ((obj as THREE.Mesh).isMesh) {
                        const mesh = obj as THREE.Mesh;
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                    }
                });
                // 简单居中并缩放
                const box = new THREE.Box3().setFromObject(model);
                const size = new THREE.Vector3();
                const center = new THREE.Vector3();
                box.getSize(size);
                box.getCenter(center);
                model.position.sub(center); // 移到原点
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) {
                    const scale = 1.5 / maxDim;
                    model.scale.setScalar(scale);
                }
                scene.add(model);

                // 模型加载后，根据包围盒自动设置相机与控制器，使其正好取景到模型
                const scaledBox = new THREE.Box3().setFromObject(model);
                const scaledSize = new THREE.Vector3();
                const scaledCenter = new THREE.Vector3();
                scaledBox.getSize(scaledSize);
                scaledBox.getCenter(scaledCenter);

                // 以最长边估算半径，计算理想距离（基于相机视场角）
                const halfMax = Math.max(scaledSize.x, scaledSize.y, scaledSize.z) * 0.5;
                const fovInRad = (camera.fov * Math.PI) / 180;
                const idealDistance = halfMax / Math.tan(fovInRad / 2);

                // 稍微拉远一点，避免裁切
                const distance = idealDistance * 1.2;
                camera.near = Math.max(distance / 100, 0.01);
                camera.far = distance * 100;
                camera.updateProjectionMatrix();

                // 将相机放到斜上方，目标对准模型中心
                camera.position.set(
                    scaledCenter.x + distance * 0.6,
                    scaledCenter.y + distance * 0.6,
                    scaledCenter.z + distance
                );
                controls.target.x = scaledCenter.x;
                controls.target.y = scaledCenter.y;
                controls.target.z = scaledCenter.z;
                controls.update();

                // 若 glTF 自带动画，则使用 AnimationMixer 播放
                if (gltf.animations && gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(model);
                    gltf.animations.forEach((clip) => {
                        const action = mixer!.clipAction(clip);
                        action.play();
                    });
                } else {
                    // 否则提供一个轻微的自动旋转作为动效
                    fallbackAutoRotateTarget = model;
                }
            },
            undefined,
            (err) => {
                // 可以在控制台查看加载错误
                // eslint-disable-next-line no-console
                console.error('Failed to load GLTF:', err);
            }
        );

        const onResize = () => {
            const newWidth = container.clientWidth || 300;
            const newHeight = container.clientHeight || 300;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', onResize);

        let rafId = 0;
        const animate = () => {
            const delta = clock.getDelta();
            if (mixer) {
                mixer.update(delta);
            } else if (fallbackAutoRotateTarget) {
                fallbackAutoRotateTarget.rotation.y += delta * 0.3;
            }
            controls.update();
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
            controls.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
            scene.traverse((obj) => {
                if ((obj as THREE.Mesh).isMesh) {
                    const mesh = obj as THREE.Mesh;
                    mesh.geometry.dispose();
                    const material = mesh.material;
                    if (Array.isArray(material)) {
                        material.forEach((m) => m.dispose());
                    } else if (material) {
                        material.dispose();
                    }
                }
            });
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}