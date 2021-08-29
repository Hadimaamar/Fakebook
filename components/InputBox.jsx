import { useSession } from "next-auth/client";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase/app";

const InputBox = () => {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  // const sendPost = async (e) => {
  //   e.preventDefault();
  //   console.log("value", inputRef.current.value);
  //   if (!inputRef.current.value) return;

  //   try {
  //     const docRef = await addDoc(collection(db, "posts"), {
  //       message: inputRef.current.value,
  //       name: session.user.name,
  //       email: session.user.email,
  //       image: session.user.image,
  //       timestamp: serverTimestamp(),
  //     }).then((docu) => {
  //       if (imageToPost) {
  //         const imagesRef = ref(storage, `posts/${docu.id}`);
  //         console.log("image:", imageToPost);
  //         const uploadTask = uploadBytesResumable(
  //           imagesRef,
  //           imageToPost,
  //           "data_url"
  //         );

  //         removeImage();

  //         uploadTask.on(
  //           "state_change",
  //           null,
  //           (error) => console.log(error),
  //           () => {
  //             //when upload completes
  //             getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
  //               await setDoc(
  //                 doc(db, "posts", docu.id),
  //                 {
  //                   postImage: url,
  //                 },
  //                 { merge: true }
  //               );
  //             });
  //           }
  //         );
  //       }
  //     });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  //   inputRef.current.value = "";
  // };
  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;
    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          //upload the image
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            () => {
              //after upload completion
              storage
                .ref(`posts`)
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  };
  const addImageToPost = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readeEvent) => {
      setImageToPost(readeEvent.target.result);
      console.log("image:", imageToPost);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className=" bg-white p-2 rounded-2xl text-gray-500 font-medium mt-6 shadow-md">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1 ">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none "
            type="text"
            ref={inputRef}
            placeholder={`Whats in your mind, ${session.user.name} ? `}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className=" flex flex-col filter hover:brightness-110
           transition duration-150 transform hover:scale-105 cursor-pointer "
          >
            <img src={imageToPost} className=" h-10 object-contain  " />
          </div>
        )}
      </div>

      <div className="flex justify-around p-3 border-t">
        <div className="input-icon">
          <VideoCameraIcon className="h-7 text-red-500 " />
          <p className="text-xs sm:text-sm xl:text-base ">Live Video</p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="input-icon"
        >
          <CameraIcon className="h-7 text-green-400 " />
          <p className="text-xs sm:text-sm xl:text-base ">Photo/Video</p>
          <input
            type="file"
            hidden
            onChange={addImageToPost}
            ref={filePickerRef}
          />
        </div>

        <div className="input-icon">
          <VideoCameraIcon className="h-7 text-yellow-300 " />
          <p className="text-xs sm:text-sm xl:text-base ">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
