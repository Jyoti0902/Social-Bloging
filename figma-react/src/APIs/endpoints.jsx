import axios from "axios";

const BASE_URL = "https://social-bloging-b.onrender.com";
const token = localStorage.getItem("token");
const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `bearer ${token}`,
        // "Content-Type": "application/json",
    },
})

//signup API
export const SignupAPI = (signupdetail) => API.post("/auth/signup", signupdetail);
//create post APIs --
export const Create = (blogDetails) => API.post("/post/create", blogDetails);
export const GetBlogs = () => API.get("/post");
export const GetBlogById = (blogId) => API.get(`/post/${blogId}`);
export const deleteBlog = (id) => API.delete(`/post/${id}`);
export const Update = (Details, id) => API.put(`/post/${id}`, Details);
export const UpdateWithPatch = (updated, id) => API.patch(`/post/update/${id}`, updated);
//comment APIs --
export const CommentDo = (comments, id) => API.post(`/post/${id}/comments`, comments);
export const DeleteComment = (id, commentId) => API.delete(`/post/${id}/comments/${commentId}`);
//profile APIs --
export const getProfileDetails = (id) => API.get(`/userProfile/profile/${id}`);
export const updateProfile = (userDetails, userId) => API.put(`/userProfile/profile/${userId}`, userDetails);
export const updateProfilePhoto = (profile, id) => API.patch(`/userProfile/profile/${id}`, profile);
//forgot password APIs
export const SendForgotEmail = (emailToSend) => API.post("/auth/send-mail", emailToSend);
export const ResetPasswordAPI = (resetDetails) => API.post("/auth/reset-password", resetDetails);
//change password API --
export const ChangePasswordAPI = (newpassword, userId) => API.patch(`/userProfile/change-password/${userId}`, newpassword);
//filter APIs --
export const Filter = (title, created_Date) => API.get(`/post/filtered?title=${title}&created_Date=${created_Date}`);
export const SearchByTitle = (title) => API.get(`/post/search?searchBy=${title}`);
