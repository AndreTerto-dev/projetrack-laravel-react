// resources/js/Components/ApplicationLogo.jsx
export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/logo.png"
            alt="Application Logo"
            style={{ height: '45px', width: 'auto' }} // Ajuste o tamanho conforme necessário
        />
    );
}