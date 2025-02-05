import { useCallback, useEffect, useState } from "react";
import Storage from "../utils/Storage";
import { StorageKeys } from "../../constants/storageKeys";

const useAuth = () => {
  const user = Storage.getItem(StorageKeys.USER_INFO);
  const [userData, setUserData] = useState(user);

  const updateUserData = useCallback((item) => {
    setUserData(item);
  }, []);

  useEffect(() => {
    Storage.setItem(StorageKeys.USER_INFO, userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(userData)]);

  return { userData, updateUserData };
};

export default useAuth;
