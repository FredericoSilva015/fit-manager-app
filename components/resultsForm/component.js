import resultsFormStyles from './styles.module.scss'

export default function ResultsForm({data, item, onChange}) {

    const onChangeHandler = (e) => onChange(e)

    return (
        <div className={resultsFormStyles.form__wrapper}>
            <h2 className={resultsFormStyles.form__title}>{item}</h2>
            <div className={resultsFormStyles.form__input__wrapper}>
                <label className={resultsFormStyles.form_label}>Calories:</label>
                <input type="number" name={`${item} Calories`} className={resultsFormStyles.form__input} onChange={onChangeHandler}></input>
            </div>
            <div className={resultsFormStyles.form__input__wrapper}>
                <label className={resultsFormStyles.form_label}>Carbs:</label>
                <input type="number" name={`${item} Carbs`}className={resultsFormStyles.form__input} onChange={onChangeHandler}></input>
            </div>
            <div className={resultsFormStyles.form__input__wrapper}>
                <label className={resultsFormStyles.form_label}>Fat:</label>
                <input type="number" name={`${item} Fat`} className={resultsFormStyles.form__input} onChange={onChangeHandler}></input>
            </div>
            <div className={resultsFormStyles.form__input__wrapper}>
                <label className={resultsFormStyles.form_label}>Protein:</label>
                <input type="number" name={`${item} Protein`} className={resultsFormStyles.form__input} onChange={onChangeHandler}></input>
            </div>
        </div>
    )
}