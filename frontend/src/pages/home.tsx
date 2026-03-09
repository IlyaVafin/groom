import { useEffect } from "react"
import Advantages from "../modules/advantages/advantages"
import Examples from "../modules/examples/examples"
import FAQ from "../modules/faq/faq"
import FormBlock from "../modules/form-block/form-block"
import Hero from "../modules/hero/hero"
import Footer from "../modules/layout/footer/footer"
import Header from "../modules/layout/header/header"
import PriceList from "../modules/price-list/price-list"
import { useCheckUser } from "../shared/hooks/useCheckUser"

export default function Home() {
	const { getUser } = useCheckUser()
	useEffect(() => {
		getUser()
	}, [getUser])
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Examples />
				<Advantages />
				<PriceList />
				<FAQ />
				<FormBlock />
			</main>
			<Footer />
		</>
	)
}
