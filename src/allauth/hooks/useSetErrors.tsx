import { useCallback } from 'react'

import { FieldError, FieldValues, UseFormSetError } from 'react-hook-form'

/* Extra sugar to help set errors on React Hook Form `useForm` from allauth callback responses
 */
export default function useSetErrors<T extends FieldValues>(
  setError: UseFormSetError<T>
) {
  // Set any field and non-field errors from the API onto the form. Non field errors go into `root.nonFieldError`.
  const setErrors = useCallback(
    (response) => {
      if (response?.errors) {
        response.errors.forEach((error) => {
          const key = error.param || 'root.nonFieldError'
          setError(key, {
            type: 'manual',
            message: error.message as string,
          } as FieldError)
        })
      }
    },
    [setError]
  )

  // TODO Consider clearing non-field errors on form becoming dirty

  // Clear non-field errors when form becomes dirty
  // useEffect(() => {
  //   if (isDirty) {
  //     clearErrors('root.nonFieldError')
  //   }
  // }, [setNonFieldErrors, isDirty])

  return setErrors
}
