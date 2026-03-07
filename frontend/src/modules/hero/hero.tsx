import Container from "../../shared/ui/container/container"
import styles from "./hero.module.css"
export default function Hero() {
	return (
		<section className={styles.hero}>
			<Container>
				<div className={styles.heroContent}>
					<h1 className={styles.heroHeading}>Порадуйте своего любимца :)</h1>
          <p className={styles.heroDescription}>Позвольте нам позаботится о красоте вашего питомца</p>
				</div>
			</Container>
			<div className={styles.overlay}></div>
		</section>
	)
}
