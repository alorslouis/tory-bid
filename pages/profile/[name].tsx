import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/layout";
3;

import { z } from "zod";

function parseDate(date: string) {
  const forDate = new Date(Date.parse(date));
  const year = forDate.getFullYear();
  const month = forDate.getMonth();
  const day = forDate.getDate();
  // const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
  // return forDate.getFullYear();
}

type RootSchema = {
  data: {
    items: Array<{
      value: {
        id: number;
        nameListAs: string;
        nameDisplayAs: string;
        nameFullTitle: string;
        nameAddressAs: string;
        latestParty: {
          id: number;
          name: string;
          abbreviation: string;
          backgroundColour: string;
          foregroundColour: string;
          isLordsMainParty: boolean;
          isLordsSpiritualParty: boolean;
          governmentType: number;
          isIndependentParty: boolean;
        };
        gender: string;
        latestHouseMembership: {
          membershipFrom: string;
          membershipFromId: number;
          house: number;
          membershipStartDate: string;
          membershipEndDate: any;
          membershipEndReason: any;
          membershipEndReasonNotes: any;
          membershipEndReasonId: any;
          membershipStatus: {
            statusIsActive: boolean;
            statusDescription: string;
            statusNotes: any;
            statusId: number;
            statusStartDate: string;
          };
        };
        thumbnailUrl: string;
      };
      links: Array<{
        rel: string;
        href: string;
        method: string;
      }>;
    }>;
    totalResults: number;
    resultContext: string;
    skip: number;
    take: number;
    links: Array<{
      rel: string;
      href: string;
      method: string;
    }>;
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // try {
//     const res1 = await fetch(
//       `https://members-api.parliament.uk/api/Members/Search?Name=${context?.params?.name}`
//     );
//     const data1: RootSchema = await res1?.json();
//     console.log(data1.items);

//     // const { data1 } = memberProfile(context?.params?.name);

//     // const res2 = await fetch(
//     //   `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Biography`
//     // );
//     // const data2 = await res2?.json();

//     // Pass data to the page via props
//     return { props: { data1 } };
//   // } catch (error) {s
//   }
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API

  try {
    const res = await fetch(
      `https://members-api.parliament.uk/api/Members/Search?Name=${context?.params?.name}`
    );
    const data = (await res.json()) as RootSchema;
    console.log(data);

    return { props: { data } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
  // console.log(data.items);
  // console.log(data);
  // Pass data to the page via props
};

function Profile({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { name } = router.query;

  // const member = { data1 };
  // console.log(member);
  // const memberDate = new Date(
  //   Date.parse(data1.value.latestHouseMembership.membershipStartDate)
  // );

  if (!data?.items[0]?.value?.id) {
    return (
      <>
        <Layout>
          <div className="container text-center">
            <div>
              <span className="font-bold italic">{name}</span> not found...
            </div>
            <Link href="/">
              <div>return home</div>
            </Link>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        {/* <div className="lg:flex-col">{data1.items.value}</div> */}
        <div className="lg:flex-col">{name}</div>
        <div className="lg:flex-col">{data?.items[0]?.value?.id}</div>
        <div className="lg:flex-col">{data?.items[0]?.value?.nameListAs}</div>
        {/* {data.items} */}
        {/* <div className="lg:flex-col">{data1.values}</div> */}
        {/* {data1.items.value} */}
        {/* <div className="lg:flex-col">{data1.value.id}</div> */}
      </Layout>
    </>
  );
}

// type profileVal = z.infer<typeof profileSchemer>;

// const memberProfile = async (paramName: string | string[] | undefined) => {
//   const data1 = await (
//     await fetch(
//       `https://members-api.parliament.uk/api/Members/Search?Name=${paramName}`
//     )
//   ).json();
//   return rootSchema.parse(data1);
// };

export default Profile;
