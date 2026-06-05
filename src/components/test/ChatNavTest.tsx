// @ts-nocheck
/* eslint-disable */
/**
 * ChatNav — updated sidebar with subtle warm-gray gradient background
 * (matches Figma reference: rgba(178,165,154,1) → rgba(225,221,218,1))
 *
 * This is a TEST FILE — drop-in replacement for the original MUI ChatNav.
 * Only the background/surface styling was changed; structure & logic preserved.
 */

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled, useTheme, type SxProps, type Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import {
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Alert,
  List,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { Fragment, useEffect, useRef } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import useGroupedConversations from 'src/hooks/use-grouped-conversations';
import { useRouter, useSearchParams } from 'next/navigation';
import { useChatContext } from 'src/layouts/chat/context';
import { useChatNavigation } from 'src/layouts/chat/chat-navigation-context';
import { useThemeMode } from 'src/theme/theme-context';
import { ChatNavItem } from '../chat/chat-nav-item';
import { CustomGPTNavItem } from '../chat/custom-gpt-nav-item';
import { ChatNavItemSkeleton } from '../chat/chat-skeleton';
import ModelSelect from '../chat/model-select';
import LanguageSelector from '../chat/language-selector';
import CustomGPTSelector from '../chat/custom-gpt-selector';
import { getChatTranslation } from '../chat/i18n';

const NAV_WIDTH = 320;

/* ------------------------------------------------------------------ */
/*  NEW: Subtle warm-gray gradient background (from Figma)            */
/* ------------------------------------------------------------------ */
/**
 * Designer spec:
 *   Linear gradient · Color burn blend
 *   rgba(178, 165, 154, 1)  →  rgba(225, 221, 218, 1)
 *
 * Implemented as a soft top-left → bottom-right gradient with a faint
 * radial highlight to recreate the "blurred light" feel from the mock.
 */
const sidebarBackgroundSx = (isLight: boolean): SxProps<Theme> => ({
  background: isLight
    ? `
        radial-gradient(120% 80% at 50% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%),
        linear-gradient(160deg, rgba(178,165,154,0.55) 0%, rgba(225,221,218,1) 55%, rgba(210,202,194,0.7) 100%)
      `
    : `linear-gradient(160deg, #1a1a1a 0%, #232323 100%)`,
  backgroundBlendMode: isLight ? 'soft-light, normal' : 'normal',
  borderRight: isLight
    ? '1px solid rgba(178,165,154,0.25)'
    : '1px solid rgba(255,255,255,0.06)',
});

const sidebarToggleIconSx = (isLightMode: boolean): SxProps<Theme> => ({
  width: 12.7,
  height: 12.7,
  filter: isLightMode ? 'none' : 'brightness(0) invert(1)',
});

const navIconBtnSx = (isLight: boolean): SxProps<Theme> => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(8px)',
  flexShrink: 0,
  boxShadow: isLight
    ? '0 1px 2px rgba(60,50,40,0.08)'
    : '0 1px 2px rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: isLight ? '#ffffff' : 'rgba(255,255,255,0.15)',
  },
});

const GroupTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  marginBottom: theme.spacing(0.15),
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '1.5px',
  paddingLeft: theme.spacing(1.5),
  paddingTop: theme.spacing(0.1),
  paddingBottom: theme.spacing(0.1),
  [theme.breakpoints.down('sm')]: { fontSize: 10 },
}));

export const ChatNavTest = () => {
  const {
    conversations,
    handleAddConversation,
    loadingNav,
    selectedConversationId,
    hasMoreOlderChats,
    loadMoreOlderChats,
    isLoadingMoreChats,
    responseLanguage,
    selectedModel,
  } = useChatContext();

  const {
    mode,
    customGPTId,
    selectedCustomGPTChatId,
    isLoadingCustomGPTChats,
    groupedCustomGPTChats,
    selectCustomGPTChat,
    createCustomGPTChat,
  } = useChatNavigation();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const { isLightMode } = useThemeMode();

  const isOpen = useBoolean(false);
  const isCollapsed = useBoolean(false);
  const isSearchOpen = useBoolean(false);
  const isShareOpen = useBoolean(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const mdUp = useResponsive('up', 'md');
  const mobile = useResponsive('down', 390);

  const isCustomGPTMode = mode === 'custom-gpt';
  const groups = useGroupedConversations(conversations, responseLanguage);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isSearchOpen.onTrue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    const sentinelEl = loadMoreSentinelRef.current;
    if (!scrollEl || !sentinelEl || !hasMoreOlderChats || isLoadingMoreChats) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMoreOlderChats();
      },
      { root: scrollEl, rootMargin: '200px', threshold: 0 }
    );
    observer.observe(sentinelEl);
    return () => observer.disconnect();
  }, [hasMoreOlderChats, isLoadingMoreChats, loadMoreOlderChats]);

  const handleCreateConversation = async () => {
    if (!isCustomGPTMode) {
      await handleAddConversation();
      return;
    }
    const chatId = await createCustomGPTChat(undefined, selectedModel);
    if (!chatId) return;
    selectCustomGPTChat(chatId);
    const nextParams = new URLSearchParams(searchParams?.toString() || '');
    nextParams.set('mode', 'custom-gpt');
    if (customGPTId) nextParams.set('gptId', customGPTId);
    nextParams.set('customChatId', chatId);
    router.push(`/chat?${nextParams.toString()}`);
  };

  /* ----------------------------- Header ---------------------------- */
  const renderHeader = (
    <Stack sx={{ width: '100%', flexShrink: 0 }}>
      {/* Logo */}
      <Stack sx={{ px: 2, pt: 5, pb: 1 }} alignItems="center">
        <Box
          component="img"
          src={
            isLightMode
              ? '/assets/Logos/latimer-logo-sidebar.svg'
              : '/assets/Logos/latimer-logo-sidebar-dark.svg'
          }
          alt="Latimer"
          sx={{ height: 48, width: 'auto' }}
        />
      </Stack>

      {/* Model selector */}
      <Stack sx={{ px: 1, pt: 0, pb: 2 }} alignItems="center">
        <ModelSelect />
      </Stack>

      {/* 5-button icon toolbar */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        sx={{
          mx: 2,
          px: 1,
          py: 1,
          mb: 5,
          backgroundColor: isLightMode
            ? 'rgba(255,255,255,0.35)'
            : 'rgba(235, 234, 233, 0.11)',
          backdropFilter: 'blur(10px)',
          borderRadius: '999px',
          boxShadow: isLightMode
            ? 'inset 0 1px 2px rgba(255,255,255,0.6), 0 1px 3px rgba(120,108,96,0.12)'
            : 'inset 0px 16px 32px -4px rgba(12, 12, 13, 0.10)',
          border: isLightMode ? '1px solid rgba(255,255,255,0.5)' : 'none',
        }}
      >
        <Tooltip title={getChatTranslation(responseLanguage, 'chat.toolbar.newChat')}>
          <IconButton
            onClick={() => {
              handleCreateConversation();
              if (!mdUp) isOpen.onFalse();
            }}
            sx={navIconBtnSx(isLightMode)}
          >
            <Iconify icon="quill:compose" width={16} sx={{ color: 'text.primary' }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={getChatTranslation(responseLanguage, 'chat.toolbar.customGpt')}>
          <span>
            <CustomGPTSelector variant="icon" />
          </span>
        </Tooltip>

        <LanguageSelector variant="icon" />

        <Tooltip title={getChatTranslation(responseLanguage, 'share.tooltip')}>
          <IconButton onClick={isShareOpen.onTrue} sx={navIconBtnSx(isLightMode)}>
            <Iconify icon="ph:export" width={16} sx={{ color: 'text.primary' }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={getChatTranslation(responseLanguage, 'chat.toolbar.collapseSidebar')}>
          <IconButton onClick={isCollapsed.onToggle} sx={navIconBtnSx(isLightMode)}>
            <Box
              component="img"
              src="/sidebar-logo.svg"
              alt="toggle sidebar"
              sx={sidebarToggleIconSx(isLightMode)}
            />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Pill search input */}
      <Stack sx={{ px: 2, pb: 1.5, alignItems: 'center' }}>
        <TextField
          placeholder={getChatTranslation(responseLanguage, 'chat.sidebar.searchChats')}
          size="small"
          onClick={() => {
            isSearchOpen.onTrue();
            if (!mdUp) isOpen.onFalse();
          }}
          inputProps={{ readOnly: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: isLightMode ? '#1a1a1a' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src="/assets/icons/search-icon.svg"
                    alt="search"
                    sx={{
                      width: 14,
                      height: 14,
                      filter: isLightMode ? 'none' : 'brightness(0)',
                    }}
                  />
                </Box>
              </InputAdornment>
            ),
            sx: { cursor: 'pointer' },
          }}
          sx={{
            width: '65%',
            '& .MuiInputBase-root': {
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: { xs: 11, sm: 12 },
              pl: 0.5,
              backgroundColor: isLightMode
                ? 'rgba(255,255,255,0.55)'
                : 'transparent',
              backdropFilter: 'blur(6px)',
            },
            '& .MuiInputBase-input::placeholder': { fontStyle: 'italic' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isLightMode
                ? 'rgba(120,108,96,0.25)'
                : 'rgba(255,255,255,0.2)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isLightMode
                ? 'rgba(120,108,96,0.4)'
                : 'rgba(255,255,255,0.3)',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: isLightMode
                ? 'rgba(120,108,96,0.4)'
                : 'rgba(255,255,255,0.3)',
              borderWidth: 1,
            },
          }}
        />
      </Stack>

      {mobile && (
        <IconButton
          onClick={isOpen.onFalse}
          sx={{ mb: 0, mt: 0.5, alignSelf: 'flex-end', mr: 1 }}
        >
          <Iconify width={20} icon="material-symbols:close" />
        </IconButton>
      )}
    </Stack>
  );

  const renderSkeleton = (
    <>
      {[...Array(12)].map((_, index) => (
        <ChatNavItemSkeleton key={index} />
      ))}
    </>
  );

  const renderContent = (
    <Scrollbar
      ref={scrollContainerRef}
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ flexGrow: 1, px: '10px', mt: { xs: 0, md: 0.5 } }}>
        {isCustomGPTMode && isLoadingCustomGPTChats ? (
          renderSkeleton
        ) : !isCustomGPTMode && loadingNav && !conversations?.length ? (
          renderSkeleton
        ) : (
          <>
            {isCustomGPTMode ? (
              <>
                {Object.keys(groupedCustomGPTChats).length === 0 ? (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    No chats yet. Start a new conversation!
                  </Alert>
                ) : (
                  Object.entries(groupedCustomGPTChats).map(
                    ([groupTitle, chats]: any, index) =>
                      chats?.length ? (
                        <Fragment key={groupTitle}>
                          <GroupTitle
                            sx={{
                              mt: index === 0 ? 0 : 3,
                              '&:first-of-type': { marginTop: 0 },
                              color: isLightMode
                                ? 'rgba(120,108,96,0.85)'
                                : 'customColors.lightGray',
                            }}
                          >
                            {groupTitle && groupTitle.toUpperCase()}
                          </GroupTitle>
                          <List disablePadding>
                            {chats.map((chat: any) => (
                              <CustomGPTNavItem
                                key={chat.id}
                                chat={chat}
                                selected={chat.id === selectedCustomGPTChatId}
                                onCloseMobile={() => isOpen.onFalse()}
                              />
                            ))}
                          </List>
                        </Fragment>
                      ) : null
                  )
                )}
              </>
            ) : (
              Object.entries(groups).map(
                ([groupTitle, groupConversations]: any, index) =>
                  groupConversations?.length ? (
                    <Fragment key={groupTitle}>
                      <GroupTitle
                        sx={{
                          mt: index === 0 ? 0 : 2.5,
                          mb: index === 0 ? 0 : 1,
                          '&:first-of-type': { marginTop: 0 },
                          color: isLightMode
                            ? 'rgba(120,108,96,0.85)'
                            : 'customColors.lightGray',
                        }}
                      >
                        {groupTitle && groupTitle.toUpperCase()}
                      </GroupTitle>
                      <Stack spacing={0.15}>
                        {groupConversations.map((conversation: any) => (
                          <ChatNavItem
                            key={conversation.id}
                            conversation={conversation}
                            selected={conversation.id === selectedConversationId}
                            onCloseMobile={() => isOpen.onFalse()}
                          />
                        ))}
                      </Stack>
                    </Fragment>
                  ) : null
              )
            )}
          </>
        )}
        {hasMoreOlderChats && (
          <Box
            ref={loadMoreSentinelRef}
            sx={{
              minHeight: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 1,
            }}
          >
            {isLoadingMoreChats && (
              <Iconify
                icon="svg-spinners:90-ring-with-bg"
                width={20}
                sx={{ color: 'text.disabled' }}
              />
            )}
          </Box>
        )}
      </Box>
    </Scrollbar>
  );

  /* ------------------------------------------------------------------ */
  /*  Root container — applies the new subtle gradient background       */
  /* ------------------------------------------------------------------ */
  return (
    <Stack
      sx={{
        width: NAV_WIDTH,
        height: '100vh',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        ...sidebarBackgroundSx(isLightMode),
      }}
    >
      {renderHeader}
      <Box sx={{ flex: 1, minHeight: 0 }}>{renderContent}</Box>
    </Stack>
  );
};

export default ChatNavTest;
