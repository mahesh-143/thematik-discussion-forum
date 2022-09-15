import { Flex} from "@chakra-ui/react"
import Theme from "../components/Theme"
import { useState, useEffect } from "react"
import { getCurrentUser } from "../Services/Services"

const MyThemes = () => {
    const [user, setUser] = useState("")
    const [themes, setThemes] = useState([])

    console.log(user)

    const fetchThemes = async () => {
        const {data} = await getCurrentUser()
        setUser(data.profile)
        setThemes(data.profile.theme)
    }

    console.log(themes)

    useEffect(() => {
     fetchThemes()
    }, [])

    const mappedThemes =
      themes &&
      themes.map((theme) => {
          return <Theme key={theme.id} theme={{ ...theme }} />
        })
  return (
    <Flex gap="1em" w="100%" marginInline="auto" px="1em" pb="2em" mt="2em" flexWrap="wrap" justify="center">
        {mappedThemes}
    </Flex>
  )
}

export default MyThemes