export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/logo.png"
            alt="Application Logo"
            style={{ height: '45px', width: 'auto' }}
        />
    );
}