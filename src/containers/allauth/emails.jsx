import { useEffect, useState } from 'react'

import {
  addEmail,
  deleteEmail,
  getEmailAddresses,
  markEmailAsPrimary,
  requestEmailVerification,
} from '@allauth/lib/allauth'

import EmailsTable from '@components/allauth/EmailsTable'

// TODO REFACTOR REQUEST Move to typescript and use RHF form handler

const Emails = () => {
  const [email, setEmail] = useState('')
  const [emailAddresses, setEmailAddresses] = useState([])
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({ status: 200, data: [] })

  useEffect(() => {
    setLoading(true)
    getEmailAddresses()
      .then((resp) => {
        if (resp.status === 200) {
          setEmailAddresses(resp.data)
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false)
      })
  }, [setLoading, setEmailAddresses])

  const handleAdd = () => {
    setLoading(true)
    addEmail(email)
      .then((resp) => {
        setContent(resp)
        if (resp.status === 200) {
          setEmailAddresses(resp.data)
          setEmail('')
        }
        // TODO Manage what happened
      })
      .catch((e) => {
        // TODO Display toast that something went wrong
        console.error(e)
      })
      .then(() => {
        setLoading(false)
      })
  }

  //   TODO disambiguate the state for each of these handlers
  const handleRequestVerification = (email) => {
    setLoading(true)
    requestEmailVerification(email)
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDelete = (email) => {
    setLoading(true)
    deleteEmail(email)
      .then((resp) => {
        setContent(resp)
        if (resp.status === 200) {
          setEmailAddresses(resp.data)
        }
        // TODO handle errors
      })
      .catch((e) => {
        // TODO Display toast
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleMakePrimary = (email) => {
    setLoading(true)
    markEmailAsPrimary(email)
      .then((resp) => {
        setContent(resp)
        if (resp.status === 200) {
          setEmailAddresses(resp.data)
        }
        // TODO Handle errors
      })
      .catch((e) => {
        // TODO Display toast
        console.error(e)
      })
      .then(() => {
        setLoading(false)
      })
  }

  return (
    <EmailsTable
      emails={emailAddresses}
      add={handleAdd}
      makePrimary={handleMakePrimary}
      delete={handleDelete}
      requestVerification={handleRequestVerification}
      disabled={loading}
    />
  )

  // return (
  //   <div>
  //     <h1>Change Email</h1>

  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Email</th>
  //           <th>Verified</th>
  //           <th>Primary</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {emailAddresses.map((ea) => {
  //           return (
  //             <tr key={ea.email}>
  //               <td>{ea.email}</td>
  //               <td>{ea.verified ? '✅' : '❌'}</td>
  //               <td>
  //                 <input
  //                   onChange={() => handleMarkAsPrimary(ea.email)}
  //                   type="radio"
  //                   checked={ea.primary}
  //                 />
  //               </td>
  //               <td>
  //                 {ea.verified ? (
  //                   ''
  //                 ) : (
  //                   <Button
  //                     onClick={() => handleRequestEmailVerification(ea.email)}
  //                     disabled={loading}
  //                   >
  //                     Resend
  //                   </Button>
  //                 )}
  //                 {ea.primary ? (
  //                   ''
  //                 ) : (
  //                   <Button
  //                     onClick={() => handleDeleteEmail(ea.email)}
  //                     disabled={loading}
  //                   >
  //                     Remove
  //                   </Button>
  //                 )}
  //               </td>
  //             </tr>
  //           )
  //         })}
  //       </tbody>
  //     </table>

  //     <h2>Add Email</h2>

  //     <FormErrors errors={content.errors} />

  //     <div>
  //       <label>
  //         Email{' '}
  //         <input
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           type="email"
  //           required
  //         />
  //       </label>
  //       <FormErrors param="email" errors={content?.errors} />
  //     </div>
  //     <Button disabled={loading} onClick={handleAddEmail}>
  //       Add
  //     </Button>
  //   </div>
  // )
}

export default Emails
