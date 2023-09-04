import React, { useEffect, useState } from 'react';
import './App.css';
import db from "./firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; 

type Post = {
    title: string;
    text: string;
    timestamp: {
        nanoseconds: number,
        seconds: number
    }
}

function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        // DB（firestore）からデータ取得
        const postData = collection(db, "posts");
        getDocs(postData).then((snapShot) => {
            console.log(snapShot.docs.map(doc => ({...doc.data()})));  // object
            setPosts(snapShot.docs.map((doc) => ({ ...doc.data() as Post})));
        });

        // リアルタイムで取得
        onSnapshot(postData, (post) => {
            setPosts(post.docs.map((doc) => ({ ...doc.data() as Post})));
        });
        
    }, []);

    return (
        <div className="App">
            <div>
            {posts.map((post) => (
                <div key={post.title}>
                    <p>{post.title}</p>
                    <p>{post.text}</p>

                </div>
            ))}
            </div>
        </div>
    );
}

export default App;