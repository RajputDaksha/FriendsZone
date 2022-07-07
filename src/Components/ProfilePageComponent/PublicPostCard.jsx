import React, { useState, useEffect } from 'react'
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from 'react-spinkit'
import { useParams } from 'react-router-dom';
// MATERIAL UI


function PublicPostCard({ profilePost, socket, threeDot, setShowLikeUserModal, setAllPosts, allPosts,theme }) {
  const [PostData, setPostdata] = useState([])
  const [length, setLength] = useState(null)
  const [PostLength, setLoadPostLength] = useState(null)
  const [arrangePost, setAllArrangePots] = useState([])
  const checkParams = useParams()
  const _id = localStorage.getItem("uuid")
  const dispatch = useDispatch()
  //LOAD ALL THE posts for users
  useEffect(() => {
    console.log("useEffect 1 for load the post")
    async function loadPosts() {
      try {
        const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${0}/${2}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const loadPostData = await loadPostResponse.json()
        if (loadPostResponse.status === 200) {
          // dispatch({
          //   type: "LOAD_POSTS",
          //   payload: loadPostData.data
          // })
          const Arrange = loadPostData.data.sort((a, b) => {
            return b.time - a.time
          })
          setAllPosts(Arrange)
        }
      } catch (err) {
        // console.log(err)
      }
    }
    loadPosts()
  }, [])
  useEffect(() => {
    async function totalComment() {
      console.log("useEffect 2nd for load the comments")
      try {
        const totalCommentResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const totalCommentData = await totalCommentResponse.json()
        if (totalCommentResponse.status === 200) {
          dispatch({ type: "SET_TOTAL_COMMENT", payload: totalCommentData.data })
          dispatch({ type: "Get_All_Comments", payload: totalCommentData.data })
        }
      } catch (error) {
        // console.warn(error)
      }
    }
    totalComment()
  }, [])
  //load the all notification 
  useEffect(() => {
    console.log("useEffect 3rd for load all the notification")
    async function loadNotification() {
      try {
        const loadNotificationResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const loadNotificationData = await loadNotificationResponse.json()
        if (loadNotificationResponse.status === 200) {
          dispatch({ type: "Send_Notification", payload: loadNotificationData.data })
        }
      } catch (err) {
        // console.warn(err)
      }
    }
    loadNotification()
  }, [])
  //===================LOAD THE USER INFORMATION FROM THE SERVER============
  useEffect(() => {
    console.log("useEffect 4 load the userinfor mation")
    async function userInfoLoad() {
      try {
        const userInfo = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const res = await userInfo.json()
        if (userInfo.status === 200) {
          dispatch({ type: "USERINFO_LOAD", payload: res.message })
          dispatch({ type: "BOOK_MARK_POST", payload: res.message.bookMarkPost })
          // const blobRes = await fetch(res.message.url)
          // const blobData = await blobRes.blob()
          // const url = URL.createObjectURL(blobData)
          // dispatch({ type: "LOADER", payload: false })
          // dispatch({ type: "uploadImageDataFromServer", payload: url })
          // // dispatch({ type: "ShowImage", payload: data.url })
          // dispatch({ type: "OriginalProfileURL", payload: url })
          // dispatch({ type: "ShowImage", payload: url })
          // dispatch({ type: "LOADER", payload: false })
        }
        else if (userInfo.status !== 200) {
          // dispatch({ type: "LOADER", payload: false })
        }
      } catch (err) {
        // console.warn(err)
      }
    }
    userInfoLoad()
  }, [])
  //=====================LOAD THE BACKGROUND IMAGE from the cloudinaryS=============
  useEffect(() => {
    console.log("useEffect 5th load bg image")
    async function BackgroundImage() {
      try {
        dispatch({ type: "LOADER", payload: true })
        const res1 = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1/`, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const data1 = await res1.json()
        if (res1.status === 200) {
          let backgroundURL;
          if (data1.url) {
            const convertURL = await fetch(data1.url)
            const blob = await convertURL.blob()
            backgroundURL = URL.createObjectURL(blob)
          }
          else {
            backgroundURL = ""
          }
          dispatch({ type: "LOADER", payload: false })
          dispatch({ type: "uploadImageDataFromServerBackground", payload: data1 })
          dispatch({ type: "ShowImageBackground", payload: backgroundURL })
          dispatch({ type: "LOADER", payload: false })
        }
        else if (res1.status !== 404) {
          return
        }
      } catch (err) {
        // console.warn(err)
      }
    }
    BackgroundImage()
  }, [])
  //====================LOAD PROFILE IMAGES fromc cloudinary=============
  useEffect(() => {
    console.log("now useEffect 6 load the profile image")
    console.log("profile Image execute with dispatch")
    async function ProfileImages() {
      let url;
      try {
        dispatch({ type: "LOADER", payload: true })
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl/`, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const data = await res.json()
        console.log("data", { data })
        if (res.status === 200) {
          if (data.url !== false) {
            const blobRes = await fetch(data.url)
            const blobData = await blobRes.blob()
            url = URL.createObjectURL(blobData)
            dispatch({ type: "OriginalProfileURL", payload: data.url })
          }
          else {
            url = ""
            dispatch({ type: "OriginalProfileURL", payload: "" })
          }
          dispatch({ type: "LOADER", payload: false })
          dispatch({ type: "uploadImageDataFromServer", payload: data })
          dispatch({ type: "ShowImage", payload: url })
          dispatch({ type: "LOADER", payload: false })
        }
        else {
          dispatch({ type: "LOADER", payload: false })
        }
      } catch (err) {
        // console.warn(err)
      }
    }
    ProfileImages()
  }, [])
  useEffect(() => {
    console.log("load the post length useEffect 7")
    async function getAllPostDataLength() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/postlength`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const response = await res.json()
        if (res.status === 200) {
          setLength(response.l)
        }
        else if (res.status !== 200) {
          setLength(0)
        }
      }
      catch (err) {
        // console.log(err)
      }
    }
    getAllPostDataLength()
  }, [])
  useEffect(() => {
    async function AllAPI() {
      dispatch({ type: "LOADER", payload: true })
      Promise.all([
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${0}/${3}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        }),
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/all/comment/user/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        }),
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/notification/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        }),
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/user/083525p7ljhwmxifts31/l66cbrsuytmj1wujuauz/nqoye5ozdqj89b4s4qoq/ua1iztaxjo4bbmzvd391/3mzqeygnoszlknp90h51/t28uf00khscofxgjwj20/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        }),
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/bg/image/mwQgga2z5KfChXjuF1s0/r6dg0LqqWmCG4W5UQOTa/ftFhzft7YNwT6jb9EVoX/ogvnbpOcPnjgMatu3mtb/JSC2PQZQVlK19QXDbSl1/`, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        }),
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/profile/image/e9thhvkKqJpnTlYo1sQl/QVbghZqhoSr2Rt5qvNYJ/iKj3RoJojFWmcDo4wTlm/9Olk5vTenhdkjHrdYEWl/`, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        }),
        fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/postlength`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
      ]).then((res) => {
        console.log(res)
        return Promise.all(res.map(i => {
          return i.json()
        }))
      }).then((value) => {
        console.log(value)
        value.forEach(async (item) => {
          if (item.post === "post") {
            dispatch({
              type: "LOAD_POSTS",
              payload: item.data
            })
          }
          else if (item.commentLength === "commentLength") {
            dispatch({ type: "SET_TOTAL_COMMENT", payload: item.data })
            dispatch({ type: "Get_All_Comments", payload: item.data })
          }
          else if (item.noti === "noti") {
            dispatch({ type: "Send_Notification", payload: item.data })
          }
          else if (item.userInfo === "INFO") {
            dispatch({ type: "USERINFO_LOAD", payload: item.message })
            dispatch({ type: "BOOK_MARK_POST", payload: item.message.bookMarkPost })
          }
          else if (item.bgImage === "bgImage") {
            dispatch({ type: "LOADER", payload: false })
            dispatch({ type: "uploadImageDataFromServerBackground", payload: item })
            dispatch({ type: "ShowImageBackground", payload: item.url })
            dispatch({ type: "LOADER", payload: false })
          }
          else if (item.profileImage === "profile") {
            let url;
            if (item.url !== false) {
              const blobRes = await fetch(item.url)
              const blobData = await blobRes.blob()
              url = URL.createObjectURL(blobData)
              dispatch({ type: "OriginalProfileURL", payload: item.url })
            }
            else {
              url = ""
              dispatch({ type: "OriginalProfileURL", payload: "" })
            }
            dispatch({ type: "LOADER", payload: false })
            dispatch({ type: "uploadImageDataFromServer", payload: item })
            dispatch({ type: "ShowImage", payload: url })
            dispatch({ type: "LOADER", payload: false })
          }
          else if (item.postLength === "postLength") {
            setLength(item.l)
          }
        })
      }).catch(err => {
        console.log("error occured", err)
      })
    }
    // AllAPI()
  }, [])
  //get all unread messages for the current user
  useEffect(() => {
    const getUnreadMessages = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/api/v1/load/all/unread/message/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("uuid")
          }
        })
        const data = await res.json()
        if (res.status === 200) {
          dispatch({ type: "SET_UNREAD_MESSAGES", payload: data.empty })
        }
        else if (res.status !== 200) {
          dispatch({ type: "SET_UNREAD_MESSAGES", payload: [] })
        }
      }
      catch (err) {
      }
    }
    getUnreadMessages()
  }, [])
  async function fetchData() {
    console.log("inifinity scroll fetch data")
    try {
      // ${process.env.REACT_APP_API_BACKENDURL}
      const loadPostResponse = await fetch(`${process.env.REACT_APP_API_BACKENDURL}/blob/load/all/post/${2}/${allPosts.length}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("uuid")
        }
      })
      const loadPostData = await loadPostResponse.json()
      console.log({ loadPostData })
      if (loadPostResponse.status === 200) {
        setLoadPostLength(loadPostData?.data.length)
        // const value = loadPostData.data !== undefined && loadPostData.data.sort((a, b) => {
        //   return b.time - a.time
        // })
        if (loadPostData.data) {
          const arrange = loadPostData.data.sort((a, b) => {
            return b.time - a.time
          }
          )
          setAllPosts(prev => [...prev, ...arrange])

        }
      }
    } catch (err) {
      console.warn(err)
    }
  }
  useEffect(() => {
    socket?.on("onlineUsers", (data) => {
      console.log("online users", data)
      dispatch({ type: "onlineUsers", payload: data })
    })
  }, [socket])


  return (
    <>
      {

        Object.keys(checkParams).length === 0 ?
          (allPosts.length > 0) && allPosts.map((item, index) => {
            return (<>
              <PostCard key={index} item={item} index={index} socket={socket} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} theme={theme} />

            </>
            )
          })
          :
          (profilePost.length > 0) && profilePost.map((item, index) => {
            return (<>
              <PostCard key={index} item={item} index={index} socket={socket} threeDot={threeDot} setShowLikeUserModal={setShowLikeUserModal} setAllPosts={setAllPosts} theme={theme} />
            </>
            )
          })
      }
      <div className={`infinite_scroll  text-center md:ml-[5rem] ml-[2rem] mt-[6rem] ${PostLength === length && "hidden"}`}>
        <InfiniteScroll
          dataLength={PostData.length}
          next={fetchData}
          hasMore={true}
          loader={<Spinner name="three-bounce" />}
          className="md:ml-[8rem] ml-[0rem]"
        />
      </div>
    </>
  )
}
export default PublicPostCard = React.memo(PublicPostCard)
