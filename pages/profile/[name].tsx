import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

const Profile: NextPage = ({ data }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <div>
        <div>passed: {name}</div>
        get: {data?.items[0].value.id}, {data.items[0].value.nameDisplayAs}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(
    `https://members-api.parliament.uk/api/Members/Search?Name=${context.params.name}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Profile;
