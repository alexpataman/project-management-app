import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton, Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';

interface IEditColumn {
  titles: { cancel: string; save: string };
  callback: () => void;
}

export const EditColumn = ({ titles, callback }: IEditColumn) => (
  <>
    <Tooltip
      enterDelay={600}
      disableFocusListener
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={titles.cancel}
    >
      <IconButton aria-label="cancel" onClick={callback}>
        <CancelIcon />
      </IconButton>
    </Tooltip>
    <Tooltip
      enterDelay={300}
      disableFocusListener
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={titles.save}
    >
      <IconButton aria-label="confirm" type="submit">
        <CheckCircleIcon />
      </IconButton>
    </Tooltip>
  </>
);
