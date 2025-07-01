import JogoDaMemoria from "./Components/JogoDaMemoria/jogodamemoria"

export default function Home() {
  return (
    <section id="main_content">
      <section id="welcome_content">
        <h1 id="welcome_title">TESTE DE JOGO DA MEMORIA</h1>
        <p id="welcome_subtitle">o jogo da memoria abaixo é um componente, todo o resto e feito no page, divirta-se :)</p>
      </section>
      <br />
      <br />
      <JogoDaMemoria />
    </section>
  );
}
