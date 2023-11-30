import React, { useState } from "react";
import styles from "./Navbar.module.css";

import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";
import axios from "axios";

const Navbar = ({
  setIsLoading,
  setUserData,
  search,
  setSearch,
  status,
  setStatus,
  gender,
  setGender,
  species,
  setSpecies,
  setTotalPage,
  setPage,
}) => {
  const [isFiltering, setIsFiltering] = useState(false);

  const handleClearFilters = async () => {
    setSearch("");
    setStatus(null);
    setGender(null);
    setSpecies(null);
    try {
      setIsLoading(true);
      const res = await axios.get("https://rickandmortyapi.com/api/character");
      if (res.status === 200) {
        setUserData(res.data?.results);
        setTotalPage(res.data?.info?.pages);
        setIsFiltering(false);
        setPage(0);
      }
      setIsLoading(false);
    } catch (err) {
      setUserData([]);
      setIsFiltering(false);
      setIsLoading(false);
      console.log(err);
    }
  };
  const handleFilters = async () => {
    if (!search && !status && !gender && !species) {
      setIsFiltering(false);
      return;
    }
    try {
      setIsLoading(true);
      setIsFiltering(false);
      const res = await axios.get("https://rickandmortyapi.com/api/character", {
        params: {
          name: search,
          status,
          gender,
          species,
        },
      });
      if (res.status === 200) {
        setUserData(res.data.results);
        setTotalPage(res.data?.info?.pages);
        setPage(1);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setUserData([]);
      setIsFiltering(false);
      console.log(err);
    }
  };

  const getData = async (e) => {
    if (search !== "" && e.keyCode === 13) {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character`,
          {
            params: { name: search },
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
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>R&M</div>
        <div className={styles.search}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Enter the text to Search"
            onKeyDown={(e) => {
              getData(e);
            }}
          />
        </div>
        <div className={styles.filter}>
          {!isFiltering ? (
            <MdOutlineFilterList
              onClick={() => setIsFiltering(!isFiltering)}
              size="2rem"
            />
          ) : (
            <MdOutlineFilterListOff
              onClick={() => setIsFiltering(!isFiltering)}
              size="2rem"
            />
          )}
        </div>
      </div>
      {isFiltering && (
        <div className={styles.filterContainer}>
          <div className={styles.filterDetails}>
            <div className={styles.status}>
              <h1>Status</h1>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Alive"
                  name="status_check_box"
                  id="Alive"
                  checked={status === "Alive"}
                  onChange={() => {
                    setStatus("Alive");
                  }}
                />

                <label htmlFor="Alive">Alive</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Dead"
                  name="status_check_box"
                  id="Dead"
                  checked={status === "Dead"}
                  onChange={() => {
                    setStatus("Dead");
                  }}
                />

                <label htmlFor="Dead">Dead</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Unknown"
                  name="status_check_box"
                  id="Unknown"
                  checked={status === "Unknown"}
                  onChange={() => {
                    setStatus("Unknown");
                  }}
                />

                <label htmlFor="Unknown">Unknown</label>
              </p>
            </div>
            <div className={styles.gender}>
              <h1>Gender</h1>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Male"
                  name="gender_check_box"
                  id="Male"
                  checked={gender === "Male"}
                  onChange={() => {
                    setGender("Male");
                  }}
                />

                <label htmlFor="Male">Male</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Female"
                  name="gender_check_box"
                  id="Female"
                  checked={gender === "Female"}
                  onChange={() => {
                    setGender("Female");
                  }}
                />

                <label htmlFor="Female">Female</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Unknown"
                  name="gender_check_box"
                  id="Unknown"
                  checked={gender === "Unknown"}
                  onChange={() => {
                    setGender("Unknown");
                  }}
                />

                <label htmlFor="Unknown">Unknown</label>
              </p>
            </div>
            <div className={styles.species}>
              <h1>Species</h1>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Human"
                  name="species_check_box"
                  id="Human"
                  checked={species === "Human"}
                  onChange={() => {
                    setSpecies("Human");
                  }}
                />

                <label htmlFor="Human">Human</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Animal"
                  name="species_check_box"
                  id="Animal"
                  checked={species === "Animal"}
                  onChange={() => {
                    setSpecies("Animal");
                  }}
                />

                <label htmlFor="Animal">Animal</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Alien"
                  name="species_check_box"
                  id="Alien"
                  checked={species === "Alien"}
                  onChange={() => {
                    setSpecies("Alien");
                  }}
                />

                <label htmlFor="Alien">Alien</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Humanoid"
                  name="species_check_box"
                  id="Humanoid"
                  checked={species === "Humanoid"}
                  onChange={() => {
                    setSpecies("Humanoid");
                  }}
                />

                <label htmlFor="Humanoid">Humanoid</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Robot"
                  name="species_check_box"
                  id="Robot"
                  checked={species === "Robot"}
                  onChange={() => {
                    setSpecies("Robot");
                  }}
                />

                <label htmlFor="Robot">Robot</label>
              </p>
              <p className={styles.filterKey}>
                <input
                  type="checkbox"
                  value="Unknown"
                  name="species_check_box"
                  id="Unknown"
                  checked={species === "Unknown"}
                  onChange={() => {
                    setSpecies("Unknown");
                  }}
                />

                <label htmlFor="Alien">Unknown</label>
              </p>
            </div>
          </div>
          <div className={styles.btn}>
            <button onClick={handleClearFilters}>Clear Filters</button>
            <button onClick={handleFilters}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
