import React from "react";
import { MainLayout } from "../../layouts";
import UserProfile from "../../components/UserProfile/UserProfile";

function UserProfilePage() {
  return (
    <MainLayout>
      <UserProfile />
    </MainLayout>
  );
}

export default UserProfilePage;