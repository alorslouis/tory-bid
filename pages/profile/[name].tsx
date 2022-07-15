import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
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

interface profile {
  items: {
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
        membershipEndDate: string;
        membershipEndReason: string;
        membershipEndReasonNotes: string;
        membershipEndReasonId: number;
        membershipStatus: {
          statusIsActive: boolean;
          statusDescription: string;
          statusNotes: string;
          statusId: number;
          statusStartDate: string;
        };
      };
      thumbnailUrl: string;
    };
    links: {
      rel: string;
      href: string;
      method: string;
    }[];
  };
  totalResults: number;
  resultContext: string;
  skip: number;
  take: number;
  links: {
    rel: string;
    href: string;
    method: string;
  }[];
}

interface bio {
  value: {
    representations: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    electionsContested: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    houseMemberships: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    governmentPosts: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    oppositionPosts: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    otherPosts: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    partyAffiliations: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
    committeeMemberships: {
      house: number;
      name: string;
      id: number;
      startDate: string;
      endDate: string;
      additionalInfo: string;
      additionalInfoLink: string;
    }[];
  };
  links: {
    rel: string;
    href: string;
    method: string;
  };
}

interface contact {
  items: {
    value: {
      type: string;
      typeDescription: string;
      typeId: number;
      isPreferred: boolean;
      isWebAddress: boolean;
      notes: string;
      line1: string;
      line2: string;
      line3: string;
      line4: string;
      line5: string;
      postcode: string;
      phone: string;
      fax: string;
      email: string;
    }[];
    links: {
      rel: string;
      href: string;
      method: string;
    };
  };
}

interface membersApi {
  data1: profile;
  data2: bio;
  data3: contact;
}

const Profile: NextPage<membersApi> = ({ data1, data2, data3 }) => {
  const router = useRouter();
  const { name } = router.query;

  const member = { data1, data2, data3 };
  // console.log(member);

  // const memberDate = new Date(
  //   Date.parse(data1.value.latestHouseMembership.membershipStartDate)
  // );

  return (
    <>
      <Layout>
        <div className="lg:flex-col">{data1.items.value}</div>
        <div className="lg:flex-col">{name}</div>
      </Layout>
    </>
  );
};

const contactSchemer = z.record({
  items: z.object({
    type: z.string(),
    typeDescription: z.string(),
    typeId: z.number,
    isPreferred: z.boolean(),
    isWebAddress: z.boolean(),
    notes: z.string(),
    line1: z.string(),
    line2: z.string(),
    line3: z.string(),
    line4: z.string(),
    line5: z.string(),
    postcode: z.string(),
    phone: z.string(),
    fax: z.string(),
    email: z.string(),
  }),
  z.object({
    rel: z.string(),
    href: z.string(),
    method: z.string(),
  })
})

items: {
  value: {
    type: string;
    typeDescription: string;
    typeId: number;
    isPreferred: boolean;
    isWebAddress: boolean;
    notes: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    postcode: string;
    phone: string;
    fax: string;
    email: string;
  }[];
  links: {
    rel: string;
    href: string;
    method: string;
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API

  const paramName = context.params?.name;
  try {
    const res1 = await fetch(
      `https://members-api.parliament.uk/api/Members/Search?Name=${paramName}`
    );
    const data1: profile = await res1?.json();
    console.log(data1);

    const res2 = await fetch(
      `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Biography`
    );
    const data2 = await res2?.json();

    const res3 = await fetch(
      `https://members-api.parliament.uk/api/Members/${data1?.items[0]?.value?.id}/Contact`
    );
    const data3 = await res3?.json();

    // Pass data to the page via props
    return { props: { data1, data2, data3 } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Profile;
