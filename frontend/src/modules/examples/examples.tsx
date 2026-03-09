import { useEffect, useState } from "react"
import Container from "../../shared/ui/container/container"
import Heading from "../../shared/ui/heading/heading"
import { getPhotosRequest } from "./api/getPhotosRequest"
import styles from "./examples.module.css"
export default function Examples() {
	const [images, setImages] = useState<string[]>([])

	useEffect(() => {
		async function getPhotos() {
			const photos = await getPhotosRequest()
			setImages(photos)
		}
		getPhotos()
	}, [])
	return (
		<section className={styles.examples}>
			<Heading className={styles.examplesHeading} as='h2'>
				Осчастливили много пушистых
			</Heading>
			<Container>
				<ul className={styles.examplesList}>
					{images && images.map((img, i) => (
						<li key={i} className={styles.exampleItem}>
							<img
								width={300}
								height={300}
								src={`http://localhost:8000/${img}`}
								alt=''
							/>
						</li>
					))}
				</ul>
			</Container>
		</section>
	)
}
