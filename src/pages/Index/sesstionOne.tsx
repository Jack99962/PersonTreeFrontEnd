const contentBox: React.CSSProperties = {
display:'flex'
}
const treeBox: React.CSSProperties = {
    width:'300px',
    flexShrink: '0'
}
const textBox: React.CSSProperties = {
}
const topTitle: React.CSSProperties = {
    fontSize: '40px',
    fontWeight: 'bolder',
    lineHeight: '3rem'
}
const subtitle: React.CSSProperties = {
    fontWeight: '12px'
}
export default () => {
    return <div style={contentBox}>
        <div style={treeBox}>
        </div>
        <div style={textBox}>
            <div style={topTitle}>Leave your story, let the world remember you</div>
            <div style={subtitle}>PersonTree is a decentralized application (DApp) that allows you to record your personal stories on the blockchain, ensuring they are permanently preserved and accessible for future generations.</div>
        </div>
    </div>
}