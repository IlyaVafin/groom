import Advantages from "../modules/advantages/advantages";
import Examples from "../modules/examples/examples";
import Hero from "../modules/hero/hero";
import Header from "../modules/layout/header/header";
import PriceList from "../modules/price-list/price-list";

export default function Home(){
  return (
    <>
    <Header/>
    <main>
      <Hero/>
      <Examples/>
      <Advantages/>
      <PriceList/>
    </main>
    </>
  )
}