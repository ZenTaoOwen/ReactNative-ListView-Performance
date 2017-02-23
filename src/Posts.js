import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  View
} from 'react-native'
import { times } from 'lodash'
import Faker from 'Faker'

let seed = times(
  20,
  () => ({
    title: Faker.Lorem.sentence(),
    description: Faker.Lorem.paragraph(),
    liked: false
  })
)

export default class Posts extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: this._rowHasChanged })

    this.state = {
      posts: seed,
      ds: ds.cloneWithRows(seed)
    }
  }

  _rowHasChanged(r1, r2) {
    return r1.liked !== r2.liked || r1.title !== r2.title || r1.description !== r2.description
  }

  _toggleLike(title) {
    const posts = this.state.posts.map(post => ({ ...post }))
    const idx = posts.findIndex(post => post.title === title)
    posts[idx].liked = !posts[idx].liked

    this.setState({
      posts: posts,
      ds: this.state.ds.cloneWithRows([...posts])
    })
  }

  _renderRow(row) {
    console.log('render row')

    return (
      <View style={ styles.row }>
        <Text style={ styles.title }>{ row.title }</Text>
        <Text style={ styles.desc }>{ row.description }</Text>
        <TouchableOpacity
          style={ styles.like }
          onPress={ () => this._toggleLike(row.title) }
        >
          <Text>{ row.liked ? 'Unlike' : 'Like' }</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ListView
        style={ styles.container }
        enableEmptySections={ true }
        automaticallyAdjustContentInsets={ false }
        dataSource={ this.state.ds }
        renderRow={ row => this._renderRow(row) }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5FCFF'
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  desc: {
    marginTop: 10,
    fontSize: 13
  },
  like: {
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  }
})

