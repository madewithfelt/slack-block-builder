const { Bit } = require('./base');
const { SlackDto } = require('../utility/lib');
const { BuilderHelper } = require('../utility/helpers');
const { props } = require('../utility/constants');

class AttachmentDto extends SlackDto {
  constructor(params) {
    super();

    this.color = params.color;
    this.fallback = params.fallback;
    this.blocks = params.blocks;

    this.pruneAndFreeze();
  }
}

class Attachment extends Bit {
  constructor(params = {}) {
    super();

    this.props.color = params.color;
    this.props.fallback = params.fallback;

    this.finalizeConstruction();
  }

  /**
   * Sets the color of the border to the left of the block quote for the Attachment
   *
   * {@link https://api.slack.com/reference/messaging/attachments|View in Slack API Documentation}
   *
   * @param {string} string
   * @return {this} The instance on which the method is called
   */

  color(string) {
    return this.set(string, props.color);
  }

  /**
   * Sets the plain text summary of the attachment used in clients that don't show formatted text (eg. IRC, mobile notifications).
   *
   * {@link https://api.slack.com/reference/messaging/attachments|View in Slack API Documentation}
   *
   * @param {string} string
   * @return {this} The instance on which the method is called
   */

  fallback(string) {
    return this.set(string, props.fallback);
  }

  /**
   * Adds Blocks to the Attachment object
   *
   * {@link https://api.slack.com/reference/messaging/attachments|View in Slack API Documentation}
   *
   * @param {...Block|Array<Block>} blocks Accepts multiple arguments or Array
   * @return {this} The instance on which the method is called
   */

  blocks(...blocks) {
    return this.append(blocks.flat(), props.blocks);
  }

  /**
   * @private
   */

  build() {
    const augmentedProps = {
      blocks: BuilderHelper.getBuilderResults(this.props.blocks),
    };

    return this.getResult(AttachmentDto, augmentedProps);
  }
}

module.exports = {
  Attachment,
  AttachmentDto,
};
