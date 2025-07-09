import JogoDaMemoria from "./Components/JogoDaMemoria/jogodamemoria"

export default function Home() {
  return (
    <section id="main_content">
      <section id="welcome_content">
        <h1 id="welcome_title">TESTE DE JOGO DA MEMORIA</h1>
        <p id="welcome_subtitle">o jogo da memoria abaixo é um componente (border azul escuro).</p>
        <p id="welcome_subsubtitle">divirta-se :)</p>
      </section>
      <br />
      <JogoDaMemoria
        Cards={["Cavalo", "Pombo", "Cachorro", "Gato", "Capivara"]}
        Images = {"./Images/JogoDaMemoria1"} //nome das imagens devem coresponder a um dos items a cima, se não usara um placeholder padrão.
        //images deve referências um folder com imagens jpg.
      />
    </section>
  );
}
