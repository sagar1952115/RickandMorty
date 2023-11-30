import React from "react";
import { useEffect, useState } from "react";
import CardList from "../../components/card-list/CardList";
import axios from "axios";
import styles from "./Home.module.css";
import Navbar from "../../components/navbar/Navbar";
import { Audio } from "react-loader-spinner";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null);
  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState("");
  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`,
        {
          params: {
            name: search,
            status,
            gender,
            species,
          },
        }
      );
      if (res.status === 200) {
        setUserData(res.data.results);
        setTotalPage(res.data?.info?.pages);
      } else {
        setUserData([]);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className={styles.container}>
      <Navbar
        setTotalPage={setTotalPage}
        page={page}
        setPage={setPage}
        setIsLoading={setIsLoading}
        userData={userData}
        setUserData={setUserData}
        search={search}
        status={status}
        gender={gender}
        species={species}
        setSearch={setSearch}
        setStatus={setStatus}
        setGender={setGender}
        setSpecies={setSpecies}
      />
      {!isLoading ? (
        <CardList userData={userData} />
      ) : (
        <div className={styles.spinner}>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass="spinner"
          />
        </div>
      )}

      <div className={styles.paginationButton}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={page === totalPage} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
