import Advantages from "../modules/advantages/advantages";
import Examples from "../modules/examples/examples";
import Hero from "../modules/hero/hero";
import Header from "../modules/layout/header/header";

export default function Home(){
  return (
    <>
    <Header/>
    <main>
      <Hero/>
      <Examples/>
      <Advantages/>
    </main>
    </>
  )
}