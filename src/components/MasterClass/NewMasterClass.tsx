import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import ListErrors from '@components/Errors/ListErrors';
import {
  TextField,
  Button,
  Chip,
  Container,
  Box,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

const Editor: React.FC = () => {
  const { slug } = useParams();
  const [tagInput, set] = useState<string>('');
  const { editorStore } = useStore() as any;
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      editorStore.setArticleSlug(slug);
      editorStore.loadInitialData();
    }
  }, [editorStore, slug]);

  const changeTitle = (e: any) => editorStore.setTitle(e.target.value);
  const changeDescription = (e: any) =>
    editorStore.setDescription(e.target.value);
  const changeBody = (e: any) => editorStore.setBody(e.target.value);
  const changeTagInput = (e: any) => set(e.target.value);

  const handleTagInputKeyDown = (ev: any) => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        handleAddTag();
        break;
      default:
        break;
    }
  };

  const handleAddTag = () => {
    if (tagInput) {
      editorStore.addTag(tagInput.trim());
      set('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (editorStore.inProgress) return;
    editorStore.removeTag(tag);
  };

  const submitForm = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    editorStore.submit().then((article: any) => {
      editorStore.reset();
      navigate(`/masterClass/${article.id}`);
    });
  };

  return (
    <Observer>
      {() => {
        const { inProgress, errors, title, description, body, tagList } =
          editorStore;

        return (
          <Box sx={{ backgroundColor: grey[100], pt: 4, pb: 4 }}>
            <Container>
              <ListErrors errors={errors} />

              <Box
                component='form'
                onSubmit={submitForm}
                sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='h4'>Create an article</Typography>
                </Box>

                <TextField
                  fullWidth
                  variant='filled'
                  label='Article Title'
                  value={title}
                  onChange={changeTitle}
                  disabled={inProgress}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  variant='filled'
                  label="What's this article about?"
                  value={description}
                  onChange={changeDescription}
                  disabled={inProgress}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  variant='filled'
                  multiline
                  rows={8}
                  label='Write your article (in markdown)'
                  value={body}
                  onChange={changeBody}
                  disabled={inProgress}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  variant='filled'
                  label='Enter tags'
                  value={tagInput}
                  onChange={changeTagInput}
                  onBlur={handleAddTag}
                  onKeyDown={handleTagInputKeyDown}
                  disabled
                />
              </Box>
            </Container>
          </Box>
        );
      }}
    </Observer>
  );
};
