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
import { useUserContext } from "../shared/context/user/useUserContext"
import FinishedOrders from "../modules/finished-orders/finished-orders"

export default function Home() {
	const { getUser } = useCheckUser()
	useEffect(() => {
		getUser()
	}, [getUser])
	const { user } = useUserContext()
	return (
		<>
			<Header />
			<main>
				<Hero />
				{user && <FinishedOrders />}
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
