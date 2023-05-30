import classes from './Checkout.module.scss'
import {useForm} from "react-hook-form";
import PropTypes from 'prop-types';

const Checkout = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = (data) => {
    props.onConfirm({
      name: data.name,
      street: data.street,
      postal: data.postal,
      city: data.city
    })
    reset({
      name: '',
      street: '',
      postal: '',
      city: ''
    })
  }

  return (
    <form
      className={classes.form}
      onSubmit={ handleSubmit(onSubmit) }
    >
      <div className={`${classes.control} ${errors.name && classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          {...register('name', {required: true})}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name?.type === 'required' && <p className={classes['error-text']}>This field is required.</p>}
      </div>
      <div className={`${classes.control} ${errors.street && classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          {...register('street', {required: true})}
          aria-invalid={errors.street ? 'true' : 'false'}
        />
        {errors.street?.type === 'required' && <p className={classes['error-text']}>This field is required.</p>}
      </div>
      <div className={`${classes.control} ${errors.postal && classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          placeholder="XXXXX"
          {...register('postal', {
            required: true,
            // eslint-disable-next-line
            pattern: /^\d{5}([\-]?\d{4})?$/,
          })}
          aria-invalid={errors.postal ? 'true' : 'false'}
        />
        {errors.postal?.type === 'required' && <p className={classes['error-text']}>This field is required.</p>}
        {errors.postal?.type === 'pattern' && <p className={classes['error-text']}>Please enter a valid postal code (5 numbers long).</p>}
      </div>
      <div className={`${classes.control} ${errors.city && classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          {...register('city', {required: true})}
          aria-invalid={errors.city ? 'true' : 'false'}
        />
        {errors.city?.type === 'required' && <p className={classes['error-text']}>This field is required.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

Checkout.propTypes = {
  onCancel: PropTypes.any,
  onConfirm: PropTypes.any,
}

export default Checkout