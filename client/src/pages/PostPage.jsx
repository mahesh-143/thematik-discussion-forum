import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import { getPost } from "../Services/Services"

const PostPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [post, setPost] = useState("")
    const [comments, setComments] = useState([])

    const fetchPost = async (id) => {
        const {data}  = await getPost(id)
        setPost(data.post)  
    }
    useEffect(() => {
        fetchPost(params.id)
    }, [])
  return (
    <div>{JSON.stringify(post)}</div>
  )
}

export default PostPage