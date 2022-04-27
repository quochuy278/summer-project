import styles from './card.module.css'

const ProjectCard = (props) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}

export default ProjectCard;