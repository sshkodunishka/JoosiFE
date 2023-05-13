import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import {
  Box,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Observer } from 'mobx-react-lite';
import ListErrors from '@components/Errors/ListErrors';
import { User } from '@/services/masterClass';

const ChatPage: React.FC = () => {
  const { chatStore, userStore } = useStore();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    chatStore.connect();
  }, [chatStore]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      chatStore.sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleMessageInputKeyDown = (ev: any) => {
    console.log(ev.keyCode);
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        handleSendMessage();
        break;
      default:
        break;
    }
  };

  return (
    <Observer>
      {() => {
        const { messages } = chatStore;
        const { currentUser } = userStore;

        if (!currentUser)
          return <ListErrors errors={['You must be logged in to chat']} />;
        const getUserName = (user: User) => {
          let name = '';
          if (user.Roles.role === 'admin') {
            name += 'Admin';
          }
          if (user.id === currentUser?.id) {
            return 'You';
          }
          return name + ' ' + user.name;
        };
        return (
          <Card
            sx={{
              mt: 3,
              mb: 2,
              p: 2,
              width: '70%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
            }}>
            <Typography
              sx={{ flexBasis: '5%', mt: 2, width: '100%' }}
              variant='h4'>
              Chat
            </Typography>

            <Divider sx={{ mb: 2, mt: 2 }} />
            <Stack sx={{ width: '100%', height: '100%' }}>
              <Stack
                ref={(el) => {
                  chatStore.messagesContainerRef = el;
                }}
                sx={{
                  height: '100%',
                  maxHeight: 'calc(70vh - 150px)',
                  overflowY: 'auto',
                  padding: 2,
                }}>
                {messages.map((message, index) => {
                  const isUserMessage = message.user.id === currentUser.id;

                  return (
                    <Box
                      key={index}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUserMessage ? 'flex-end' : 'flex-start',
                      }}>
                      <Box
                        sx={{
                          p: 1,
                          mb: 1,
                          bgcolor: 'primary.main',
                          borderRadius: '10px',
                          maxWidth: '80%',
                          minWidth: '30%',
                          textAlign: isUserMessage ? 'right' : 'left',
                          wordWrap: 'break-word',
                        }}>
                        <Box
                          sx={{
                            color: 'text.secondary',
                          }}>
                          {getUserName(message.user)}
                        </Box>
                        <Box
                          sx={{
                            color: 'primary.contrastText',
                          }}>
                          {message.message}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>

              <Box sx={{ mt: 2, width: '100%' }}>
                <TextField
                  variant='outlined'
                  placeholder='Type your message here...'
                  sx={{
                    width: '100%',
                    borderRadius: '20px',
                    padding: '10px',
                    border: 'none',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    '&:focus': {
                      outline: 'none',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    },
                  }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSendMessage}
                  onKeyDown={handleMessageInputKeyDown}
                />
              </Box>
            </Stack>
          </Card>
        );
      }}
    </Observer>
  );
};

export default ChatPage;
