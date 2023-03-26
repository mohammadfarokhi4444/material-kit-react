import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
// components
import Iconify from '../iconify';
// sections
import { PostListHead } from '../../sections/posts';
import CustomDialog from './CustomDialog';
import { deletePost, getPosts } from '../../apis/posts';
import PopUpEdit from './PopUpEdit';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'body', label: 'Body' },
  { id: 'action', label: 'Action' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Posts() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteItem, setDeleteItem] = useState();
  const [editItem, setEditItem] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dataPosts, setDataPosts] = useState([]);
  const {
    t,
    i18n: { dir, language },
  } = useTranslation();
  const FetchData = async () => {
    const res = await getPosts();
    setDataPosts(res.dataBody);
  };
  useEffect(() => {
    async function fetchData() {
      await FetchData();
    }
    fetchData();
  }, []);

  const handleOpenDelete = (item) => {
    setDeleteItem(item);
    setShowDialog(true);
  };
  const handleDelete = async (id) => {
    setShowDialog(false);
    const res = await deletePost(id);
    if (res.success) {
      const list = dataPosts.filter((el) => el.id !== id);
      setDataPosts(list);
    }
  };
  const handleOpenEdit = (event, item) => {
    setEditItem(item);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataPosts.length) : 0;

  const filteredUsers = applySortFilter(dataPosts, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Card sx={{ overflow: 'auto !important' }}>
          <TableContainer sx={{ minWidth: 800, direction: dir(language) }}>
            <Table>
              <PostListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataPosts.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, title, body } = row;
                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                      <TableCell align="center">{id}</TableCell>
                      <TableCell align="center">{title}</TableCell>
                      <TableCell align="center">{body}</TableCell>
                      <TableCell align="right" sx={{ display: 'flex' }}>
                        <IconButton size="large" color="inherit" onClick={() => handleOpenDelete(id)}>
                          <Iconify icon={'material-symbols:delete-outline'} />
                        </IconButton>
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={(e) => handleOpenEdit(e, { id, title, body })}
                        >
                          <Iconify icon={'material-symbols:edit'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataPosts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <CustomDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        text={t('all.delete')}
        warningText={t('all.recovery')}
        yes={t('all.yes')}
        no={t('all.no')}
        handleSubmitDialog={() => handleDelete(deleteItem)}
      />
      <PopUpEdit
        open={open}
        setOpen={setOpen}
        setDataPosts={setDataPosts}
        dataPosts={dataPosts}
        editItem={editItem}
        handleCloseMenu={handleCloseMenu}
      />
    </>
  );
}
