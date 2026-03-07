import Container from "../../shared/ui/container/container";
import Heading from "../../shared/ui/heading/heading";
import styles from './examples.module.css'
import Example from './../../assets/jpg/example.jpg'
export default function Examples() {
  return (
    <section className={styles.examples}>
      <Heading className={styles.examplesHeading} as="h2">Осчастливили много пушистых</Heading>
      <Container>
        <ul className={styles.examplesList}>
          {Array.from({length: 8}).map((_, i) => (
            <li key={i} className={styles.exampleItem}>
              <img width={300} height={300} src={Example} alt=""/>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}