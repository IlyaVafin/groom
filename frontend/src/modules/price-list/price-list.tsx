import { Fragment, useState } from "react"
import Container from "../../shared/ui/container/container"
import Heading from "../../shared/ui/heading/heading"
import { tabs } from "./const/tabs"
import Tab from "./ui/tab"
import styles from "./price-list.module.css"
import { prices } from "./const/prices"
export default function PriceList() {
	const [activeTab, setActiveTab] = useState("Маленькие собаки")
	return (
		<section className={styles.priceBlock}>
			<Container>
				<Heading className={styles.heading} as='h2'>
					Наши цены
				</Heading>
				<ul className={styles.tabList}>
					{tabs.map(tab => (
						<Tab key={tab} onClick={() => setActiveTab(tab)} isActive={tab === activeTab}>
							{tab}
						</Tab>
					))}
				</ul>
				<ul className={styles.priceList}>
					{prices.map(price => (
						<Fragment key={price.type}>
							{price.type === activeTab && (
								<>
									{price.prices.map(priceItem => (
										<li
											key={priceItem.name}
											className={styles.priceItem}
										>
											<Heading as='h5'>{priceItem.name}</Heading>
											<p className={styles.price}>{priceItem.price} ₽</p>
										</li>
									))}
								</>
							)}
						</Fragment>
					))}
				</ul>
			</Container>
		</section>
	)
}
