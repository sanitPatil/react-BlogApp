import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Button } from "../Components/Elements/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;
    
    
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post){ 
                    setPost(post)
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost =async () => {
        try{
        
            
            await appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }catch(error){
            console.log(error.message);
            
        }
        
    };

    return post ? (
        <div className="py-8 ">
            
                <div className="w-full h-[80vh] flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    

                    {isAuthor && (
                        <div className="absolute right-12 bg-gradient-to-r from-gray-700 rounded-lg to-transparent top-1 p-2 m-1">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="rounded-xl text-xl bg-slate-900 dark:text-slate-950 dark:bg-slate-100 p-2 font-medium text-primary transition-all duration-200 hover:underline text-blue-500 m-2">
                                    Edit
                                </button>
                            </Link>
                            <button className="rounded-xl text-xl bg-slate-900 dark:text-slate-950 dark:bg-slate-100 p-2 font-medium text-primary transition-all duration-200 hover:underline text-blue-500" onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            
        </div>
    ) : null;
}