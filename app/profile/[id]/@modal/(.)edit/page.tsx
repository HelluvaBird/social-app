'use client';

import Modal from '@/components/Modal';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditModal() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: '',
    occupation: '',
    picturePath: '',
    coverPath: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPicture, setCoverPicture] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/myprofile');
      const data = await res.json();

      setFormData(data);
    };
    fetchProfile();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    if (e.target.name === 'picturePath') {
      setProfilePicture(e.target.files[0]);
    } else {
      setCoverPicture(e.target.files[0]);
    }
  };
  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    let url = formData.picturePath;
    let coverUrl = formData.coverPath;

    if (profilePicture) {
      const pictureRef = ref(
        storage,
        `social-app/images/${session?.user.id}/profile`
      );
      const snapshot = await uploadBytes(pictureRef, profilePicture);
      url = await getDownloadURL(snapshot.ref);
    }

    if (coverPicture) {
      const pictureRef = ref(
        storage,
        `social-app/images/${session?.user.id}/cover`
      );
      const snapshot = await uploadBytes(pictureRef, coverPicture);
      coverUrl = await getDownloadURL(snapshot.ref);
    }

    const res = await fetch('/api/myprofile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        picturePath: url,
        coverPath: coverUrl,
      }),
    });

    if (res.ok) {
      router.back();
      router.refresh();
    }
  };
  return (
    <Modal>
      <div className="bg-[#1a1a1a] text-[#c2c2c2] rounded-xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-white">Edit Profile</h2>
            <button
              type="submit"
              className="bg-[#00D5FA] px-4 py-1 text-white font-bold tracking-wider rounded-xl"
            >
              Save
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-1">
              <label htmlFor="picturePath">Profile Picture</label>
              <input
                type="file"
                name="picturePath"
                id="picturePath"
                className="bg-[#333333] py-1 px-4 rounded-lg text-lg"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="coverPath">Cover Picture</label>
              <input
                type="file"
                name="coverPath"
                id="coverPath"
                className="bg-[#333333] py-1 px-4 rounded-lg text-lg"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                className="bg-[#333333] py-1 px-4 rounded-lg text-lg"
                onChange={handleChange}
                value={formData.location}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                className="bg-[#333333] py-1 px-4 rounded-lg text-lg"
                onChange={handleChange}
                value={formData.occupation}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
