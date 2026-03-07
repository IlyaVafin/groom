import { Plus } from "lucide-react"
import Container from "../../shared/ui/container/container"
import Heading from "../../shared/ui/heading/heading"
import { faqs } from "./const/faqs"
import styles from "./faq.module.css"
import { useState } from "react"
export default function FAQ() {
	const [activeFAQ, setActiveFAQ] = useState(-1)
	return (
		<section className={styles.faqBlock}>
			<Container>
				<Heading className={styles.heading} as='h2'>
					Часто задаваемые вопросы
				</Heading>
				<div className={styles.faqList}>
					{faqs.map((faq, i) => (
						<div key={faq.question}>
							<div
								onClick={() => setActiveFAQ(i)}
								className={`${styles.faqItem}`}
							>
								<Heading as='h6'>{faq.question}</Heading>
								<Plus className={activeFAQ === i ? styles.rotate : styles.icon} width={24} height={24} />
							</div>
							<div
								className={`${styles.answer}  ${activeFAQ === i ? styles.show : ""}`}
							>
								<p
									className={`${styles.answerParagraph}${activeFAQ === i ? styles.show : ""}`}
								>
									{faq.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
