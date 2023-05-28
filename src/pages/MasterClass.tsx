import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  Place,
  AttachMoneyOutlined,
  People,
  DateRange,
} from "@mui/icons-material";
import { useStore } from "../store";
import RedError from "@components/Errors/RedError";
import MasterClassTrainer from "../components/MasterClass/MasterClassMeta";
import MasterClassActions from "../components/MasterClass/MasterClassActions";
import { EmptyImageLink } from "@/services/constants";

const MasterClass: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { masterClassStore, userStore } = useStore();
  useEffect(() => {
    if (id) {
      if (isNaN(+id)) {
        navigate("/");
        return;
      }
      masterClassStore.loadDescription(+id, userStore.currentUser?.id);
    }
  }, [masterClassStore, id]);

  const handleDeleteDescription = (id: number) => {
    masterClassStore.deleteMasterClass(id).then(() => navigate("/"));
  };

  const handleSignUp = (id: number) => {
    masterClassStore.signUp(id);
  };

  const handleCancelSignUp = (id: number) => {
    masterClassStore.cancelClass(id);
  };

  return (
    <Observer>
      {() => {
        const { currentUser } = userStore;
        const { listOfUsers, description, isLoading } = masterClassStore;
        if (!id) return <RedError message="Can't load masterClass" />;
        if (isLoading) <CircularProgress />;
        if (!description) return <RedError message="Can't load masterClass" />;

        return (
          <Box
            sx={{
              mt: "10px",
              mb: "10px",
              width: "90%",
              height: "100%",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* MasterClass title, photo, meta  */}
              <Stack direction="row">
                <Card
                  sx={{
                    m: 1,
                    p: 1,
                    flexBasis: "30%",
                  }}
                >
                  <Box sx={{ height: "300px" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={
                        description.MasterClasses.imageLink || EmptyImageLink
                      }
                      alt={"masterClass image"}
                      sx={{
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Stack direction="row" minWidth="50%" sx={{ mb: 2 }}>
                    <Place sx={{ mr: 1 }} color="primary" />
                    <Typography>{description.place}</Typography>
                  </Stack>

                  <Stack sx={{ mb: 2 }} direction="row">
                    <AttachMoneyOutlined sx={{ mr: 1 }} color="primary" />
                    <Typography>{description.price}</Typography>
                  </Stack>

                  <Stack sx={{ mb: 2 }} direction="row">
                    <People sx={{ mr: 1 }} color="primary" />
                    <Typography>{description.countOfPeople}</Typography>
                  </Stack>

                  <Stack direction="row" sx={{ mb: 2, width: "100%" }}>
                    <DateRange sx={{ mr: 1 }} color="primary" />
                    <Typography>
                      {new Date(description.eventDate).toDateString() +
                        " " +
                        new Date(description.eventDate)
                          .toLocaleTimeString()
                          .substring(0, 5)}
                      {}
                    </Typography>
                  </Stack>
                  <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                    Styles:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                    {description.MasterClasses.ClassesStyles.map(
                      (danceStyle) => {
                        return (
                          <Chip
                            key={danceStyle.style.id}
                            label={danceStyle.style.style}
                            sx={{ mr: 1, mb: 1 }}
                            variant="outlined"
                          />
                        );
                      }
                    )}
                  </Box>
                </Card>
                {/* Right Panel  */}
                <Card sx={{ flexBasis: "70%", m: "10px 20px", p: 2 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography variant="h4">
                      {description.MasterClasses.title}
                    </Typography>
                    <Box sx={{ flexBasis: "20%" }}>
                      <MasterClassTrainer description={description} />
                    </Box>
                  </Stack>

                  {description.MasterClasses.videoLink ? (
                    <CardMedia
                      component="video"
                      controls
                      height="450"
                      sx={{
                        padding: 1,
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      src={description.MasterClasses.videoLink}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="450"
                      image={
                        description.MasterClasses.imageLink || EmptyImageLink
                      }
                      alt={"masterClass image"}
                      sx={{
                        m: 3,
                        padding: 1,
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Card>
              </Stack>
              {/* Description, tags, action buttons  */}
              <Card sx={{ m: 2, p: 2 }}>
                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      mb: 2,
                      typography: "body1",
                    }}
                  >
                    {description.MasterClasses.description}
                  </Box>
                </Box>
                <Box>
                  <MasterClassActions
                    handleSignUp={handleSignUp}
                    handleDescribe={handleCancelSignUp}
                    currentUser={currentUser}
                    description={description}
                    onDelete={handleDeleteDescription}
                  />
                </Box>
              </Card>
              {currentUser?.Roles.role === "choreographer" && (
                <Card sx={{ m: 2, p: 2 }}>
                  <Typography variant="h5">List of requests:</Typography>
                  {listOfUsers.map((user) => (
                    <Stack sx={{ alignItems: "center", mt: 2 }} direction="row">
                      <Box sx={{ mr: 2 }}>
                        <Avatar
                          sx={{ width: 50, height: 50 }}
                          src={user.photoLink}
                          alt=""
                        />
                      </Box>
                      <Typography sx={{ fontSize: 21 }}>
                        {user.name} {user.lastName}
                      </Typography>
                    </Stack>
                  ))}
                  {listOfUsers.length === 0 && (
                    <Typography sx={{ fontSize: 18 }}>No Requests</Typography>
                  )}
                </Card>
              )}
            </Card>
          </Box>
        );
      }}
    </Observer>
  );
};

export default MasterClass;
