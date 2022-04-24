import axios from 'axios'
import { useEffect, useState } from 'react'

const useUserLoad = (url, arg) => {
  const [users, setUsers] = useState(arg)

  useEffect(() => {
    axios.get(url).then((res) => {
      const { data } = res
      setUsers(data)
    })
  }, [users])

  return [users, setUsers]
}

export default useUserLoad
