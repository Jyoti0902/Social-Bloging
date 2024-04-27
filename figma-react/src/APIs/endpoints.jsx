import axios from "axios";

const BASE_URL = "http://localhost:5505";
const token = localStorage.getItem("token");
const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `bearer ${token}`,
        // "Content-Type": "application/json",
    },
})
//create post APIs
export const Create = (blogDetails) => API.post("/post/create", blogDetails);
export const GetBlogs = () => API.get("/post");
export const GetBlogById = (id) => API.get(`/post/${id}`);
export const deleteBlog = (id) => API.delete(`/post/${id}`);
export const Update = (Details, id) => API.put(`/post/${id}`, Details);
export const UpdateWithPatch = (updated, id) => API.patch(`/post/update/${id}`, updated);
//comment APIs
export const CommentDo = (comments, id) => API.post(`/post/${id}/comments`, comments);
export const DeleteComment = (id, commentId) => API.delete(`/post/${id}/comments/${commentId}`);
//profile APIs
export const getProfileDetails = (id) => API.get(`/userProfile/profile/${id}`);
export const updateProfile = (updateDetails, id) => API.put(`/userProfile/profile/${id}`, updateDetails);
export const updateProfilePhoto = (profile, id) => API.patch(`/userProfile/profile/${id}`, profile);
//forgot password APIs
export const SendForgotEmail = (emailToSend) => API.post("/auth/send-mail", emailToSend);
export const ResetPasswordAPI = (resetDetails) => API.post("/auth/reset-password", resetDetails);
//change password API
export const ChangePasswordAPI = (newPassword, userId) => API.patch(`/userProfile/change-password/${userId}`, newPassword);
//filter APIs
export const Filter = (qtitle, createdDate) => API.get(`/post/filtered?title=${qtitle}&created_Date=${createdDate}`);
export const SearchByTitle = (qtitle) => API.get(`/post/search?searchBy=${qtitle}`); 