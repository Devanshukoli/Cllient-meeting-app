import React from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface BookingLinkSectionProps {
  bookingLink: string | null;
  onGenerate: () => void;
  onCopy: () => void;
  isPending: boolean;
}

export const BookingLinkSection: React.FC<BookingLinkSectionProps> = ({
  bookingLink,
  onGenerate,
  onCopy,
  isPending,
}) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mt: 4, 
        borderRadius: 2, 
        bgcolor: 'primary.light', 
        color: 'primary.contrastText' 
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Booking Link
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
        Generate a unique link to share with your clients for booking.
      </Typography>
      {!bookingLink ? (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<LinkIcon />}
          onClick={onGenerate}
          disabled={isPending}
          sx={{ fontWeight: 'bold' }}
        >
          Generate Link
        </Button>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'rgba(255,255,255,0.1)', 
              p: 1.5, 
              borderRadius: 1,
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                flexGrow: 1, 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                mr: 1 
              }}
            >
              {bookingLink}
            </Typography>
            <IconButton onClick={onCopy} size="small" sx={{ color: 'inherit' }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <LinkIcon sx={{ alignSelf: 'center', mt: 1, opacity: 0.5 }} />
        </Box>
      )}
    </Paper>
  );
};
