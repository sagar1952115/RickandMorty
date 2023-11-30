import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./Profile.module.css";
const Profile = () => {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState("");
  const [episodeInfo, setEpisodeInfo] = useState([]);

  // fetch user data of userId = id

  const handleProfile = async (id) => {
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (res.status === 200) {
        setProfileInfo(res.data);
        console.log(res.data);

        const episodeData = await Promise.all(
          res.data?.episode.map(async (item) => await getEpisodeInfo(item))
        );
        setEpisodeInfo(episodeData);
        console.log(episodeData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Get data of the episodes where user was part of the episode.

  const getEpisodeInfo = async (url) => {
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleProfile(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img className={styles.image} src={profileInfo.image} alt="" />
      </div>
      <div className={styles.info}>
        {" "}
        <div className={styles.personalInfo}>
          <h2>Personal Info</h2>
          <div>
            <strong>Name</strong> : {profileInfo.name}
          </div>
          <div>
            <strong>Gender</strong> : {profileInfo.gender}
          </div>
          <div>
            <strong>Species</strong> : {profileInfo.species}
          </div>
          <div>
            <strong>Status</strong> : {profileInfo.status}
          </div>
        </div>
        <div className={styles.originDetails}>
          <h2>Origin & Location Info</h2>
          <div>
            <strong>Origin</strong> : {profileInfo.location?.name}
          </div>
          <div>
            <strong>location</strong> : {profileInfo.origin?.name}
          </div>
        </div>
        <div className={styles.episodesContainer}>
          {episodeInfo.map((episode, index) => {
            return (
              <div key={index} className={styles.episode}>
                {episode.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
