import { Flex} from "@chakra-ui/react"
import Theme from "../components/Theme"
import { getThemes } from "../Services/Services"
import { useState, useEffect } from "react"

const Themes = () => {
    const [themes, setThemes] = useState(null)
    const fetchThemes = async () => {
      const { data } = await getThemes()
      setThemes(data.themes)
      console.log("themes data : ", data.themes)

    }
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

export default Themes