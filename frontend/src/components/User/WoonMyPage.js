import React, { Component } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Image
} from 'grommet'
import Swal from 'sweetalert2'
import axios from 'axios'

class WoonMyPage extends Component {
  render () {
    return (
      <Box width='large'>
        <Table>
          <TableHeader />
          <TableBody>
            <TableRow>
              <TableCell scope='row' pad='medium'>
                <strong>아이디</strong>
              </TableCell>
              <TableCell>zz@zz</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope='row' pad='medium'>
                <strong>비밀번호</strong>
              </TableCell>
              <TableCell>
                <Box align='center'>
                  <Button primary label='수정' />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope='row' pad='medium'>
                <strong>이름</strong>
              </TableCell>
              <TableCell>zz</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope='row' pad='medium'>
                <strong>프로필</strong>
              </TableCell>
              <TableCell>
                <Box height='small' width='small'>
                  <Image
                    fit='cover'
                    src='https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg'
                    alt='profile'
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box align='end'>
          <Button
            className='test'
            primary
            color='red'
            label='회원탈퇴'
            onClick={this.leave}
          />
        </Box>
      </Box>
    )
  }
  leave = e => {
    let loginId = sessionStorage.getItem('loginId')
    e.preventDefault()
    Swal.fire({
      title: '탈퇴하시겠습니까?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '탈퇴',
      cancelButtonText: '취소'
    }).then(result => {
      if (result.value) {
        axios
          .delete(`http://localhost:9000/users/delete/${loginId}`)
          .then(res => {
            sessionStorage.clear()
            Swal.fire('탈퇴가 완료되었습니다.')
            this.props.history.push('/')
          })
      }
    })
  }
}
export default WoonMyPage
