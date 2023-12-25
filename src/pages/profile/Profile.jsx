import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./Profile.module.css";
const Profile = () => {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState("");
  const [episodeInfo, setEpisodeInfo] = useState([]);
  const episode = localStorage.getItem("episode");
  const newEpisodeArray = episode ? JSON.parse(episode) : [];
  console.log(newEpisodeArray);
  // fetch user data of userId = id

  const handleProfile = async (id) => {
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (res.status === 200) {
        setProfileInfo(res.data);

        const unCachedEpisode = getUncachedEpisode(res.data.episode);
        const episodeData = await Promise.all(
          unCachedEpisode.map(async (item) => await getEpisodeInfo(item))
        );
        if (episode) {
          const episodeArray = newEpisodeArray.concat(episodeData);
          localStorage.setItem("episode", JSON.stringify(episodeArray));
        } else {
          localStorage.setItem("episode", JSON.stringify(episodeData));
        }
        const userEpisodeInfo = newEpisodeArray.filter((cachedEpisode) =>
          res.data.episode.some((url) => url === cachedEpisode.url)
        );

        setEpisodeInfo(userEpisodeInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // This function will get the url of the episode which are not present in localstorage

  const getUncachedEpisode = (userEpisode) => {
    if (newEpisodeArray.length === 0) return userEpisode;

    const unCachedEpisode = userEpisode
      .filter(
        (url) =>
          !newEpisodeArray
            .map((cachedEpisode) => cachedEpisode.url)
            .includes(url)
      )
      .map((url) => url);

    console.log(unCachedEpisode);

    return unCachedEpisode;
  };

  // Get data of the episodes where user was part of the episode.

  const getEpisodeInfo = async (url) => {
    try {
      console.log(url);
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
