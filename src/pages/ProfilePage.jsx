import { useEffect, useState } from "react";
import {
  addAllergy,
  getUserAllergy,
  getUserProfile,
  editUserProfile,
  userLogout,
} from "../api/services/authService";
import { jwtDecode } from "jwt-decode";
import Button from "../components/Elements/Button";
import Input from "../components/Elements/Input";
import { PiEnvelopeDuotone, PiUserDuotone } from "react-icons/pi";
import ModalBox from "../components/Elements/ModalBox";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  let userId = null;

  if (!accessToken) {
    navigate("/login");
  } else {
    try {
      userId = jwtDecode(accessToken)?.id;
    } catch (error) {
      console.error("Invalid access token:", error);
    }
  }

  const [profileData, setProfileData] = useState(null); // State to hold profile data
  const [editableProfile, setEditableProfile] = useState({
    // Editable profile state
    email: "",
    username: "",
  });
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [allergy, setAllergy] = useState([]); // State for selected allergies
  const [saving, setSaving] = useState(false); // State to prevent double saving
  const [profileSaving, setProfileSaving] = useState(false); // State to prevent profile saving while in progress
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Allergy options
  const allergyOptions = [
    "Milk, Eggs, Other Dairy",
    "Seafood",
    "Nuts",
    "Meat",
    "Cheese",
    "Bakery/Bread",
    "Tea and Coffee",
  ];

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfile(userId, accessToken);
          setProfileData(response.response.payload);
          setEditableProfile({
            email: response.response.payload.email,
            username: response.response.payload.username,
          });
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setError("Failed to fetch profile data.");
        }
      };

      const fetchAllergies = async () => {
        try {
          const response = await getUserAllergy(userId);
          if (
            response?.response?.payload?.Allergy?.[0]?.allergy?.data &&
            response.message === "Success"
          ) {
            const allergies = response.response.payload.Allergy[0].allergy.data;
            setAllergy(allergies);
          } else {
            setError("Invalid response structure.");
          }
        } catch (error) {
          console.error("Error fetching allergies:", error);
          setError("Failed to fetch allergies.");
        } finally {
          setLoading(false);
        }
      };

      if (userId && accessToken) {
        fetchProfile();
        fetchAllergies();
      } else {
        setError("User not authenticated.");
        setLoading(false);
      }
    }
  }, [userId, accessToken]);

  const handleSelectAllergy = (selectedAllergy) => {
    if (allergy.includes(selectedAllergy)) {
      setAllergy(allergy.filter((item) => item !== selectedAllergy));
    } else {
      setAllergy([...allergy, selectedAllergy]);
    }
  };

  const handleSaveAllergies = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const payload = { allergy };
      const response = await addAllergy(userId, payload);

      if (response.message === "Success") {
      } else {
        alert(`Failed to save allergies: ${response.message}`);
      }
    } catch (error) {
      console.error("Error saving allergies:", error);
      alert("An error occurred while saving allergies.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditProfile = async () => {
    if (profileSaving) return;
    setProfileSaving(true);

    try {
      const { email, username } = editableProfile;
      const payload = { email, username };
      const response = await editUserProfile(userId, payload, accessToken);

      if (response.status === 200) {
        setProfileData({ ...profileData, email, username });
        setShowModal(true);
      } else {
        alert(`Failed to update profile: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveAll = () => {
    handleSaveAllergies();
    handleEditProfile();
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      await userLogout(refreshToken);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setShowModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="container mx-auto px-6 pt-6 lg:pt-8">
      <div className="lg:max-w-lg m-auto mb-6">
        <h1 className="text-center font-bold text-xl mb-16">My Profile</h1>
        <div>
          <div className="flex gap-2 items-center mb-2 text-primary">
            <PiEnvelopeDuotone size={"1.3rem"} />
            <label className="block text-sm font-poppinsMedium">Email</label>
          </div>
          <Input
            type="text"
            value={editableProfile.email || ""}
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="flex gap-2 items-center mb-2 text-primary">
            <PiUserDuotone size={"1.3rem"} />
            <label className="block text-sm font-poppinsMedium">Username</label>
          </div>
          <Input
            type="text"
            value={editableProfile.username || ""}
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-12">
          <h2 className="mb-4 font-poppinsMedium">My Allergy</h2>
          <div className="border p-4 flex flex-wrap justify-center gap-2 rounded-lg">
            {allergyOptions.map((option) => (
              <div
                key={option}
                className={`border rounded-lg px-4 py-2 cursor-pointer transition-transform transform hover:scale-105 ${
                  allergy.includes(option)
                    ? "bg-primary text-white text-sm"
                    : "bg-white text-primary text-sm border-gray-300"
                }`}
                onClick={() => handleSelectAllergy(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={handleSaveAll}
          classname={`bg-red-600 text-white w-full hover:bg-black  ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      {showModal && (
        <ModalBox
          title="Profile Updated"
          isAnimation={true}
          animation="success_animation.json"
          description="Your profile has been successfully updated. You need to log out to apply changes."
          primaryAction={handleLogout}
          primaryStyle="w-full"
          primaryActionText="Logout"
          isPrimaryAction={true}
          isSecondaryAction={false}
        />
      )}
    </div>
  );
};

export default ProfilePage;
