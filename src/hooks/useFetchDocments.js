import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot, // ATENCAO
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollections,
  search = null,
  uid = null
) => {
  const [docments, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const RefCollection = await collection(db, docCollections);

      try {
        let q;

        // busca
        // dashboard

        q = await query(RefCollection, orderBy("createAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }
    loadData();
  }, [docCollections, search, uid, cancelled]); // fazer a busca se algum desses virem

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { docments, loading, error };
};