import Card from "../../shared/ui/card/card"
import Container from "../../shared/ui/container/container"
import Heading from "../../shared/ui/heading/heading"
import styles from "./advantages.module.css"
import { cards } from "./const/cards"
export default function Advantages() {
	return (
		<section className={styles.advantages}>
			<Container>
				<Heading className={styles.heading} as='h2'>
					Наши преимущества
				</Heading>
				<ul className={styles.list}>
					{cards.map(card => {
						const Icon = card.icon
						return (
							<li key={card.heading}>
								<Card className={`${styles.cardAdvantages}`}>
									<Icon width={30} className={styles.cardIcon} height={30} />
									<Heading as='h4'>{card.heading}</Heading>
									<p className={styles.description}>{card.description}</p>
								</Card>
							</li>
						)
					})}
				</ul>
			</Container>
		</section>
	)
}
