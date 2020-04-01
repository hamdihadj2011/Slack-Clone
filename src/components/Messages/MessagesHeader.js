import React, { Component } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
class MessagesHeader extends Component {
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
      isPrivateChannel,
      isChannelStarred,
      handleStar
    } = this.props;
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header
          fluide='true'
          as='h2'
          floated='left'
          style={{ marginBottom: "0" }}
        >
          <span>
            {channelName}
            {!isPrivateChannel && (
              <Icon 
              name={isChannelStarred? 'star':'star outline'} 
              color={isChannelStarred ?'yellow':'black'} 
              onClick={handleStar} />
            )}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>
        {/* Search Inpout */}
        <Header floated='right'>
          <Input
            loading={searchLoading}
            size='mini'
            icon='search'
            name='searchTerm'
            placeholder='Search Messages'
            onChange={handleSearchChange}
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
